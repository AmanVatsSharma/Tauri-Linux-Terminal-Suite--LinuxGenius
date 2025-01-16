#!/bin/bash
set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🗑️ Uninstalling Linux Terminal AI Assistant Suite${NC}"
echo "==============================================="

INSTALL_DIR="/opt/linux-terminal-suite"
DESKTOP_FILE="/usr/share/applications/linux-terminal-suite.desktop"
BINARY_LINK="/usr/local/bin/linux-terminal-suite"
ICON_DIR="/usr/share/icons/hicolor"

# Check if installed
if [ ! -d "$INSTALL_DIR" ] && [ ! -f "$DESKTOP_FILE" ]; then
    echo -e "${YELLOW}⚠️ Linux Terminal AI Suite doesn't appear to be installed${NC}"
    exit 0
fi

echo -e "${YELLOW}🗑️ Removing application files...${NC}"

# Remove binary and directory
if [ -d "$INSTALL_DIR" ]; then
    sudo rm -rf "$INSTALL_DIR"
    echo -e "${GREEN}✅ Removed: $INSTALL_DIR${NC}"
fi

# Remove symlink
if [ -L "$BINARY_LINK" ]; then
    sudo rm "$BINARY_LINK"
    echo -e "${GREEN}✅ Removed: $BINARY_LINK${NC}"
fi

# Remove desktop file
if [ -f "$DESKTOP_FILE" ]; then
    sudo rm "$DESKTOP_FILE"
    echo -e "${GREEN}✅ Removed: $DESKTOP_FILE${NC}"
fi

# Remove icons
if [ -f "$ICON_DIR/32x32/apps/linux-terminal-suite.png" ]; then
    sudo rm "$ICON_DIR/32x32/apps/linux-terminal-suite.png"
fi

if [ -f "$ICON_DIR/128x128/apps/linux-terminal-suite.png" ]; then
    sudo rm "$ICON_DIR/128x128/apps/linux-terminal-suite.png"
fi

# Update caches
sudo update-desktop-database /usr/share/applications/ 2>/dev/null || true
sudo gtk-update-icon-cache "$ICON_DIR" 2>/dev/null || true

echo -e "${GREEN}✅ Uninstallation completed!${NC}"
echo ""
echo -e "${YELLOW}📝 Note:${NC} Your OpenAI API key and user settings were not removed."
echo "They may still be stored in your home directory."
echo ""
echo -e "${GREEN}👋 Thanks for trying Linux Terminal AI Assistant Suite!${NC}"