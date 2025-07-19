# 🏗️ Build and Installation Guide

<div align="center">

![Build Status](https://img.shields.io/badge/build-ready-green.svg)
![Platform](https://img.shields.io/badge/platform-Linux-orange.svg)
![Architecture](https://img.shields.io/badge/arch-x64%20%7C%20ARM64-blue.svg)

*Complete guide for building and installing Linux Terminal AI Assistant Suite*

</div>

---

## 📋 **Table of Contents**

1. [🎯 Overview](#-overview)
2. [⚡ Quick Install (Users)](#-quick-install-users)
3. [🏗️ Building from Source](#️-building-from-source)
4. [📦 Distribution Packages](#-distribution-packages)
5. [🖥️ Desktop Integration](#️-desktop-integration)
6. [🔧 Troubleshooting](#-troubleshooting)
7. [🚀 Advanced Options](#-advanced-options)

---

## 🎯 **Overview**

The Linux Terminal AI Assistant Suite is a Tauri-based desktop application that can be:
- **Built from source** for development and customization
- **Installed as binary** for end users
- **Packaged** for distribution (AppImage, .deb, .rpm)
- **Integrated** with desktop environments

**System Requirements:**
- Linux (Ubuntu 18.04+, Debian 10+, CentOS 8+, Arch, etc.)
- Architecture: x86_64 or ARM64
- RAM: 512MB minimum, 1GB recommended
- Storage: 50MB for application

---

## ⚡ **Quick Install (Users)**

### **Option 1: Download Pre-built Binary**

```bash
# Download the latest release (replace with actual release URL)
wget https://github.com/AmanVatsSharma/Tauri-Linux-Terminal-Suite--LinuxGenius/releases/download/v0.1.0/linux-terminal-suite_0.1.0_amd64.AppImage

# Make executable
chmod +x linux-terminal-suite_0.1.0_amd64.AppImage

# Run the application
./linux-terminal-suite_0.1.0_amd64.AppImage
```

### **Option 2: Install via Package Manager**

**Ubuntu/Debian (.deb package):**
```bash
# Download .deb package
wget https://github.com/AmanVatsSharma/Tauri-Linux-Terminal-Suite--LinuxGenius/releases/download/v0.1.0/linux-terminal-suite_0.1.0_amd64.deb

# Install
sudo dpkg -i linux-terminal-suite_0.1.0_amd64.deb

# Fix dependencies if needed
sudo apt-get install -f

# Launch
linux-terminal-suite
```

**Red Hat/CentOS/Fedora (.rpm package):**
```bash
# Download .rpm package
wget https://github.com/AmanVatsSharma/Tauri-Linux-Terminal-Suite--LinuxGenius/releases/download/v0.1.0/linux-terminal-suite-0.1.0-1.x86_64.rpm

# Install
sudo rpm -i linux-terminal-suite-0.1.0-1.x86_64.rpm
# or
sudo dnf install linux-terminal-suite-0.1.0-1.x86_64.rpm

# Launch
linux-terminal-suite
```

---

## 🏗️ **Building from Source**

### **Prerequisites**

**1. Install System Dependencies:**

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install -y \
    build-essential \
    curl \
    wget \
    libssl-dev \
    pkg-config \
    libgtk-3-dev \
    libwebkit2gtk-4.1-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    patchelf
```

**Red Hat/CentOS/Fedora:**
```bash
sudo dnf install -y \
    gcc \
    gcc-c++ \
    make \
    curl \
    wget \
    openssl-devel \
    pkgconfig \
    gtk3-devel \
    webkit2gtk4.1-devel \
    libappindicator-gtk3-devel \
    librsvg2-devel \
    patchelf
```

**Arch Linux:**
```bash
sudo pacman -S --needed \
    base-devel \
    curl \
    wget \
    openssl \
    pkgconf \
    gtk3 \
    webkit2gtk-4.1 \
    libappindicator-gtk3 \
    librsvg \
    patchelf
```

**2. Install Node.js (v18+):**
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using nvm (recommended for developers)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

**3. Install Rust:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### **Build Steps**

**1. Clone and Setup:**
```bash
# Clone repository
git clone https://github.com/AmanVatsSharma/Tauri-Linux-Terminal-Suite--LinuxGenius.git
cd Tauri-Linux-Terminal-Suite--LinuxGenius

# Install JavaScript dependencies
npm install

# Verify setup
npm run build  # Frontend build test
```

**2. Development Build:**
```bash
# Start development server (for testing)
npm run dev
# Application will be available at http://localhost:1420
```

**3. Production Build:**
```bash
# Build the complete application
export PATH="$HOME/.cargo/bin:$PATH"
npm run tauri build
```

**Build Output Location:**
```
src-tauri/target/release/bundle/
├── appimage/
│   └── linux-terminal-suite_0.1.0_amd64.AppImage
├── deb/
│   └── linux-terminal-suite_0.1.0_amd64.deb  
├── rpm/
│   └── linux-terminal-suite-0.1.0-1.x86_64.rpm
└── linux-terminal-suite                      # Binary executable
```

---

## 📦 **Distribution Packages**

### **AppImage (Recommended for Users)**

**Advantages:**
- ✅ No installation required
- ✅ Works on any Linux distribution
- ✅ Portable and self-contained
- ✅ No dependency conflicts

**Usage:**
```bash
# Download
wget [AppImage URL]

# Make executable
chmod +x linux-terminal-suite_0.1.0_amd64.AppImage

# Run
./linux-terminal-suite_0.1.0_amd64.AppImage

# Optional: Integrate with desktop
./linux-terminal-suite_0.1.0_amd64.AppImage --appimage-extract-and-run
```

### **Debian Package (.deb)**

**For:** Ubuntu, Debian, Linux Mint, Pop!_OS, Elementary OS

**Installation:**
```bash
# Install package
sudo dpkg -i linux-terminal-suite_0.1.0_amd64.deb

# If dependencies missing:
sudo apt-get install -f

# Launch from terminal
linux-terminal-suite

# Or from applications menu
```

### **RPM Package (.rpm)**

**For:** Red Hat, CentOS, Fedora, openSUSE

**Installation:**
```bash
# Fedora/CentOS 8+
sudo dnf install linux-terminal-suite-0.1.0-1.x86_64.rpm

# CentOS 7/RHEL 7
sudo yum install linux-terminal-suite-0.1.0-1.x86_64.rpm

# openSUSE
sudo zypper install linux-terminal-suite-0.1.0-1.x86_64.rpm
```

---

## 🖥️ **Desktop Integration**

### **Automatic Integration (Package Installs)**

When installed via .deb or .rpm packages, the application automatically integrates:

- ✅ Applications menu entry
- ✅ Desktop file registration
- ✅ MIME type associations
- ✅ Icon installation
- ✅ Uninstaller registration

### **Manual Integration (AppImage/Binary)**

**Create Desktop Entry:**
```bash
# Create desktop file
cat > ~/.local/share/applications/linux-terminal-suite.desktop << EOF
[Desktop Entry]
Name=Linux Terminal AI Suite
Comment=AI-enhanced terminal experience for Linux
Exec=/path/to/linux-terminal-suite
Icon=/path/to/linux-terminal-suite-icon.png
Terminal=false
Type=Application
Categories=Development;System;TerminalEmulator;
Keywords=terminal;ai;linux;command;
StartupWMClass=Linux Terminal AI Suite
EOF

# Update desktop database
update-desktop-database ~/.local/share/applications/
```

**Install Icons:**
```bash
# Copy icons from source
sudo cp src-tauri/icons/32x32.png /usr/share/icons/hicolor/32x32/apps/linux-terminal-suite.png
sudo cp src-tauri/icons/128x128.png /usr/share/icons/hicolor/128x128/apps/linux-terminal-suite.png
sudo gtk-update-icon-cache /usr/share/icons/hicolor/
```

---

## 🔧 **Troubleshooting**

### **Build Issues**

**Issue: "Failed to resolve import '@tauri-apps/plugin-process'"**
```bash
# Solution: Already fixed in codebase
npm install
npm run build  # Should work now
```

**Issue: "Rust not found"**
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

**Issue: "Node.js version too old"**
```bash
# Update Node.js
nvm install 20
nvm use 20
# Or reinstall via package manager
```

### **Runtime Issues**

**Issue: "libwebkit2gtk not found"**
```bash
# Ubuntu/Debian
sudo apt install libwebkit2gtk-4.1-0

# Fedora
sudo dnf install webkit2gtk4.1

# Arch
sudo pacman -S webkit2gtk-4.1
```

**Issue: "Application doesn't start"**
```bash
# Check dependencies
ldd ./linux-terminal-suite

# Run with debug info
RUST_LOG=debug ./linux-terminal-suite

# Check system requirements
uname -a
cat /etc/os-release
```

**Issue: "OpenAI API connection fails"**
```bash
# Check internet connection
curl -I https://api.openai.com/v1/models

# Verify API key format
# Should start with "sk-" and be 51 characters long
```

### **Package Issues**

**Issue: ".deb package conflicts"**
```bash
# Remove conflicting packages
sudo apt remove [conflicting-package]
sudo dpkg -i linux-terminal-suite_0.1.0_amd64.deb
```

**Issue: "Permission denied"**
```bash
# Fix permissions
chmod +x linux-terminal-suite
# For AppImage
chmod +x linux-terminal-suite_0.1.0_amd64.AppImage
```

---

## 🚀 **Advanced Options**

### **Custom Build Configuration**

**Modify Tauri Config:**
```bash
# Edit configuration
nano src-tauri/tauri.conf.json

# Custom identifier
"identifier": "com.yourcompany.terminal-suite"

# Custom window settings
"windows": [{
  "width": 1400,
  "height": 900,
  "minWidth": 1000,
  "minHeight": 700
}]
```

**Environment Variables:**
```bash
# Development build with debug info
export RUST_LOG=debug
export TAURI_DEBUG=true
npm run tauri dev

# Production build optimized
export RUSTFLAGS="-C target-cpu=native"
npm run tauri build
```

### **Cross-Compilation**

**Build for different architectures:**
```bash
# For ARM64 (aarch64)
rustup target add aarch64-unknown-linux-gnu
npm run tauri build -- --target aarch64-unknown-linux-gnu

# For ARM (32-bit)
rustup target add arm-unknown-linux-gnueabihf
npm run tauri build -- --target arm-unknown-linux-gnueabihf
```

### **Custom Packaging**

**Create Custom .deb:**
```bash
# Install packaging tools
sudo apt install dpkg-dev fakeroot

# Build package
npm run tauri build
# Outputs to: src-tauri/target/release/bundle/deb/
```

**Create Custom AppImage:**
```bash
# Install appimage tools
wget https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
chmod +x appimagetool-x86_64.AppImage

# Build custom AppImage
npm run tauri build
# Outputs to: src-tauri/target/release/bundle/appimage/
```

### **Automation Scripts**

**Build Script (build.sh):**
```bash
#!/bin/bash
set -e

echo "🏗️ Building Linux Terminal AI Suite..."

# Install dependencies
npm ci

# Build frontend
npm run build

# Build Tauri app
npm run tauri build

echo "✅ Build complete! Check src-tauri/target/release/bundle/"
```

**Release Script (release.sh):**
```bash
#!/bin/bash
set -e

VERSION=$(grep '"version"' src-tauri/tauri.conf.json | cut -d'"' -f4)
echo "📦 Creating release v$VERSION..."

# Build all packages
./build.sh

# Create release directory
mkdir -p release/v$VERSION

# Copy packages
cp src-tauri/target/release/bundle/appimage/* release/v$VERSION/
cp src-tauri/target/release/bundle/deb/* release/v$VERSION/
cp src-tauri/target/release/bundle/rpm/* release/v$VERSION/
cp src-tauri/target/release/linux-terminal-suite release/v$VERSION/

echo "✅ Release v$VERSION ready in release/ directory"
```

---

## 📞 **Support**

**Build Issues:**
- 📋 Check [GitHub Issues](https://github.com/AmanVatsSharma/Tauri-Linux-Terminal-Suite--LinuxGenius/issues)
- 💬 Ask in [Discussions](https://github.com/AmanVatsSharma/Tauri-Linux-Terminal-Suite--LinuxGenius/discussions)

**Installation Help:**
- 📖 Read the [FAQ](https://github.com/AmanVatsSharma/Tauri-Linux-Terminal-Suite--LinuxGenius/wiki/FAQ)
- 🐛 Report bugs with system info and logs

**Community:**
- 💻 Linux distributions testing needed
- 🤝 Contributors welcome for packaging
- 📦 Package maintainers for distributions wanted

---

<div align="center">
<b>Happy Building! 🚀</b><br>
<i>Creating the future of AI-enhanced terminal experiences</i>
</div>