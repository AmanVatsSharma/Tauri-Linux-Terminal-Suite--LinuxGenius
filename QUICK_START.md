# 🚀 Quick Start Guide

## For End Users (Just Want to Use the App)

### Option 1: Download Pre-built Package (Recommended)
1. Go to [Releases](https://github.com/AmanVatsSharma/Tauri-Linux-Terminal-Suite--LinuxGenius/releases)
2. Download the appropriate package for your system:
   - **AppImage** (universal): `linux-terminal-suite_0.1.0_amd64.AppImage`
   - **Debian/Ubuntu**: `linux-terminal-suite_0.1.0_amd64.deb`
   - **Red Hat/Fedora**: `linux-terminal-suite-0.1.0-1.x86_64.rpm`

### Option 2: Install via Package Manager
```bash
# Ubuntu/Debian
wget [deb-package-url]
sudo dpkg -i linux-terminal-suite_0.1.0_amd64.deb

# Fedora/RHEL
wget [rpm-package-url]
sudo dnf install linux-terminal-suite-0.1.0-1.x86_64.rpm
```

### Option 3: Run AppImage
```bash
# Download and run
wget [appimage-url]
chmod +x linux-terminal-suite_0.1.0_amd64.AppImage
./linux-terminal-suite_0.1.0_amd64.AppImage
```

---

## For Developers (Want to Build from Source)

### Prerequisites
Install system dependencies first:

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install -y \
    build-essential curl wget \
    libgtk-3-dev libwebkit2gtk-4.1-dev \
    libayatana-appindicator3-dev librsvg2-dev \
    patchelf pkg-config
```

**Fedora/RHEL:**
```bash
sudo dnf install -y \
    gcc gcc-c++ make curl wget \
    gtk3-devel webkit2gtk4.1-devel \
    libappindicator-gtk3-devel librsvg2-devel \
    patchelf pkgconfig
```

### Build Steps

1. **Clone and Setup:**
```bash
git clone [repo-url]
cd linux-terminal-suite
npm install
```

2. **Install Rust (if not installed):**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

3. **Build Application:**
```bash
# Easy way - use our build script
./scripts/build.sh

# Manual way
npm run build          # Build frontend
npm run tauri build    # Build Tauri app
```

4. **Install Locally (Optional):**
```bash
./scripts/install.sh
```

### Build Output
After successful build, you'll find:
- **Binary**: `src-tauri/target/release/linux-terminal-suite`
- **AppImage**: `src-tauri/target/release/bundle/appimage/`
- **Debian Package**: `src-tauri/target/release/bundle/deb/`
- **RPM Package**: `src-tauri/target/release/bundle/rpm/`

---

## First Launch

1. **Launch the application**
   - From applications menu: Search "Linux Terminal AI Suite"
   - From command line: `linux-terminal-suite`

2. **Configure AI (Required)**
   - Enter your OpenAI API key in the right sidebar
   - Click "Connect AI"

3. **Start Using**
   - Type any Linux command in the terminal
   - View AI analysis and suggestions in real-time
   - Use ↑/↓ keys for command history

---

## Example Commands to Try

```bash
ls -la                    # Directory listing with AI analysis
ps aux                    # Process list with optimization tips
netstat -tulnp            # Network analysis with security insights
df -h                     # Disk usage with recommendations
sudo systemctl status     # Service status with explanations
```

---

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/AmanVatsSharma/Tauri-Linux-Terminal-Suite--LinuxGenius/issues)
- **Discussions**: [GitHub Discussions](https://github.com/AmanVatsSharma/Tauri-Linux-Terminal-Suite--LinuxGenius/discussions)
- **Documentation**: [Full Build Guide](BUILD_AND_INSTALL.md)

---

## System Requirements

- **OS**: Linux (Ubuntu 18.04+, Debian 10+, CentOS 8+, Arch, etc.)
- **Architecture**: x86_64 or ARM64
- **RAM**: 512MB minimum, 1GB recommended
- **Storage**: 50MB for application
- **OpenAI API Key**: Required for AI features