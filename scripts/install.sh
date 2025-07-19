#!/bin/bash
set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

INSTALL_DIR="/opt/linux-terminal-suite"
DESKTOP_FILE="/usr/share/applications/linux-terminal-suite.desktop"
BINARY_LINK="/usr/local/bin/linux-terminal-suite"
ICON_DIR="/usr/share/icons/hicolor"

echo -e "${BLUE}🚀 Installing Linux Terminal AI Assistant Suite${NC}"
echo "==============================================="

# Check if running as root
if [[ $EUID -eq 0 ]]; then
    echo -e "${RED}❌ Don't run this script as root! Use sudo when prompted.${NC}"
    exit 1
fi

# Find built binary
BINARY_PATH=""
if [ -f "src-tauri/target/release/linux-terminal-suite" ]; then
    BINARY_PATH="src-tauri/target/release/linux-terminal-suite"
elif [ -f "target/release/linux-terminal-suite" ]; then
    BINARY_PATH="target/release/linux-terminal-suite"
else
    echo -e "${RED}❌ Built binary not found. Please run build.sh first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found binary: $BINARY_PATH${NC}"

# Install binary
echo -e "${YELLOW}📦 Installing binary...${NC}"
sudo mkdir -p "$INSTALL_DIR"
sudo cp "$BINARY_PATH" "$INSTALL_DIR/"
sudo chmod +x "$INSTALL_DIR/linux-terminal-suite"

# Create symlink
sudo ln -sf "$INSTALL_DIR/linux-terminal-suite" "$BINARY_LINK"

# Install icons
echo -e "${YELLOW}🎨 Installing icons...${NC}"
if [ -d "src-tauri/icons" ]; then
    sudo mkdir -p "$ICON_DIR/32x32/apps"
    sudo mkdir -p "$ICON_DIR/128x128/apps"
    
    if [ -f "src-tauri/icons/32x32.png" ]; then
        sudo cp "src-tauri/icons/32x32.png" "$ICON_DIR/32x32/apps/linux-terminal-suite.png"
    fi
    
    if [ -f "src-tauri/icons/128x128.png" ]; then
        sudo cp "src-tauri/icons/128x128.png" "$ICON_DIR/128x128/apps/linux-terminal-suite.png"
    fi
    
    # Update icon cache
    sudo gtk-update-icon-cache "$ICON_DIR" 2>/dev/null || true
fi

# Create desktop entry
echo -e "${YELLOW}🖥️ Creating desktop entry...${NC}"
sudo tee "$DESKTOP_FILE" > /dev/null << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=Linux Terminal AI Suite
Comment=AI-enhanced terminal experience for Linux
GenericName=AI Terminal
Exec=$INSTALL_DIR/linux-terminal-suite
Icon=linux-terminal-suite
StartupNotify=true
NoDisplay=false
Categories=Development;System;TerminalEmulator;
Keywords=terminal;ai;linux;command;analysis;
Terminal=false
StartupWMClass=Linux Terminal AI Suite
MimeType=
EOF

# Update desktop database
sudo update-desktop-database /usr/share/applications/ 2>/dev/null || true

# Set permissions
sudo chmod 644 "$DESKTOP_FILE"

echo -e "${GREEN}✅ Installation completed!${NC}"
echo ""
echo "🎉 Linux Terminal AI Assistant Suite is now installed:"
echo ""
echo -e "   • ${BLUE}Command line:${NC} linux-terminal-suite"
echo -e "   • ${BLUE}Applications menu:${NC} Search for 'Linux Terminal AI Suite'"
echo -e "   • ${BLUE}Binary location:${NC} $INSTALL_DIR/linux-terminal-suite"
echo ""
echo -e "${YELLOW}📝 To get started:${NC}"
echo "   1. Launch the application"
echo "   2. Enter your OpenAI API key in the sidebar"
echo "   3. Start using AI-enhanced terminal commands!"
echo ""
echo -e "${GREEN}🚀 Happy terminal hacking!${NC}"