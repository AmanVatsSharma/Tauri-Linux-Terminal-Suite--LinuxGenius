#!/bin/bash
set -e

echo "🏗️ Building Linux Terminal AI Assistant Suite..."
echo "================================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js v18+${NC}"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version $NODE_VERSION is too old. Please install Node.js v18+${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version)${NC}"

# Check Rust
if ! command -v cargo &> /dev/null; then
    echo -e "${RED}❌ Rust/Cargo not found. Please install Rust${NC}"
    exit 1
fi

export PATH="$HOME/.cargo/bin:$PATH"
echo -e "${GREEN}✅ Rust $(rustc --version)${NC}"

# Check system dependencies
echo -e "${YELLOW}📦 Checking system dependencies...${NC}"

MISSING_DEPS=()

check_pkg_config() {
    if ! pkg-config --exists "$1" 2>/dev/null; then
        MISSING_DEPS+=("$1")
        return 1
    fi
    return 0
}

check_pkg_config "gtk+-3.0"
check_pkg_config "webkit2gtk-4.1"
check_pkg_config "glib-2.0"

if [ ${#MISSING_DEPS[@]} -ne 0 ]; then
    echo -e "${RED}❌ Missing system dependencies: ${MISSING_DEPS[*]}${NC}"
    echo -e "${YELLOW}💡 Run: sudo apt install pkg-config libgtk-3-dev libwebkit2gtk-4.1-dev libayatana-appindicator3-dev librsvg2-dev${NC}"
    exit 1
fi

echo -e "${GREEN}✅ System dependencies OK${NC}"

# Install Node.js dependencies
echo -e "${YELLOW}📦 Installing Node.js dependencies...${NC}"
npm ci

# Build frontend
echo -e "${YELLOW}🏗️ Building frontend...${NC}"
npm run build

# Build Tauri application
echo -e "${YELLOW}🦀 Building Tauri application...${NC}"
echo "This may take several minutes for the first build..."

# Show progress
npm run tauri build &
BUILD_PID=$!

# Monitor build progress
echo -e "${YELLOW}⏳ Building... (this may take 5-15 minutes)${NC}"
echo "💡 Tip: Subsequent builds will be much faster!"

wait $BUILD_PID
BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
    echo ""
    echo "📦 Build artifacts are available in:"
    echo "   • src-tauri/target/release/bundle/appimage/ - AppImage (recommended)"
    echo "   • src-tauri/target/release/bundle/deb/ - Debian package"
    echo "   • src-tauri/target/release/bundle/rpm/ - RPM package"
    echo "   • src-tauri/target/release/ - Binary executable"
    echo ""
    echo -e "${GREEN}🎉 Ready to distribute!${NC}"
else
    echo -e "${RED}❌ Build failed with exit code $BUILD_EXIT_CODE${NC}"
    exit $BUILD_EXIT_CODE
fi