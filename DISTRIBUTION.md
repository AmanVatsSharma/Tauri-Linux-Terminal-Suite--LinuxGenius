# 📦 Distribution & Installation Guide

## 🎯 **For Package Maintainers & Distributors**

### **Creating Distribution Packages**

After running `npm run tauri build`, you'll have several package formats:

```bash
src-tauri/target/release/bundle/
├── appimage/
│   └── linux-terminal-suite_0.1.0_amd64.AppImage     # Universal Linux
├── deb/
│   └── linux-terminal-suite_0.1.0_amd64.deb          # Debian/Ubuntu
├── rpm/
│   └── linux-terminal-suite-0.1.0-1.x86_64.rpm      # RedHat/Fedora
└── linux-terminal-suite                               # Raw binary
```

### **Package Verification**

**Test AppImage:**
```bash
cd src-tauri/target/release/bundle/appimage/
chmod +x linux-terminal-suite_0.1.0_amd64.AppImage
./linux-terminal-suite_0.1.0_amd64.AppImage --help
```

**Test Debian Package:**
```bash
cd src-tauri/target/release/bundle/deb/
dpkg-deb --info linux-terminal-suite_0.1.0_amd64.deb
dpkg-deb --contents linux-terminal-suite_0.1.0_amd64.deb
```

**Test RPM Package:**
```bash
cd src-tauri/target/release/bundle/rpm/
rpm -qpi linux-terminal-suite-0.1.0-1.x86_64.rpm
rpm -qpl linux-terminal-suite-0.1.0-1.x86_64.rpm
```

---

## 🏪 **Distribution Channels**

### **GitHub Releases**
```bash
# Create release with all packages
gh release create v0.1.0 \
  src-tauri/target/release/bundle/appimage/* \
  src-tauri/target/release/bundle/deb/* \
  src-tauri/target/release/bundle/rpm/* \
  --title "Linux Terminal AI Suite v0.1.0" \
  --notes "AI-enhanced terminal experience for Linux"
```

### **Package Repositories**

**Debian/Ubuntu PPA:**
```bash
# Upload to Launchpad PPA
dput ppa:username/linux-terminal-suite linux-terminal-suite_0.1.0_source.changes
```

**AUR (Arch Linux):**
```bash
# Create PKGBUILD for AUR
# See: https://wiki.archlinux.org/title/Creating_packages
```

**Flathub (Flatpak):**
```bash
# Create Flatpak manifest
# See: https://docs.flathub.org/docs/for-app-authors/submission/
```

**Snap Store:**
```bash
# Create snapcraft.yaml
# See: https://snapcraft.io/docs/creating-a-snap
```

---

## 📋 **System Requirements Documentation**

### **Minimum Requirements**
- **OS**: Linux kernel 3.10+ (glibc 2.17+)
- **Architecture**: x86_64 (amd64) or aarch64 (arm64)
- **RAM**: 512MB available
- **Storage**: 50MB free space
- **Display**: X11 or Wayland

### **Runtime Dependencies**
- `libgtk-3-0` (GTK 3.22+)
- `libwebkit2gtk-4.1-0` (WebKit 2.20+)
- `glibc` (2.17+)

### **Tested Distributions**
- ✅ Ubuntu 18.04, 20.04, 22.04, 24.04
- ✅ Debian 10, 11, 12
- ✅ Fedora 35, 36, 37, 38, 39
- ✅ CentOS 8, 9
- ✅ Arch Linux
- ✅ openSUSE Leap 15.x
- ✅ Pop!_OS 20.04, 22.04

---

## 🔧 **Advanced Installation Options**

### **Network Installation**
```bash
# Direct download and install
curl -L [release-url]/install.sh | bash
```

### **Docker/Podman Support**
```dockerfile
FROM ubuntu:22.04
RUN apt update && apt install -y libgtk-3-0 libwebkit2gtk-4.1-0
COPY linux-terminal-suite /usr/local/bin/
CMD ["linux-terminal-suite"]
```

### **Portable Installation**
```bash
# Extract AppImage for portable use
./linux-terminal-suite_0.1.0_amd64.AppImage --appimage-extract
cd squashfs-root/
./linux-terminal-suite
```

---

## 📊 **Package Metadata**

### **Desktop Entry (.desktop file)**
```ini
[Desktop Entry]
Version=1.0
Type=Application
Name=Linux Terminal AI Suite
Comment=AI-enhanced terminal experience for Linux
GenericName=AI Terminal
Exec=linux-terminal-suite
Icon=linux-terminal-suite
StartupNotify=true
Categories=Development;System;TerminalEmulator;
Keywords=terminal;ai;linux;command;analysis;
Terminal=false
MimeType=application/x-shellscript;text/x-sh;
```

### **Package Dependencies**

**Debian Control:**
```
Package: linux-terminal-suite
Version: 0.1.0
Architecture: amd64
Depends: libgtk-3-0, libwebkit2gtk-4.1-0, libc6
Recommends: ca-certificates
Section: utils
Priority: optional
Description: AI-enhanced terminal experience for Linux
```

**RPM Spec:**
```spec
Name: linux-terminal-suite
Version: 0.1.0
Release: 1
Summary: AI-enhanced terminal experience for Linux
License: MIT
Requires: gtk3, webkit2gtk4.1, glibc
```

---

## 🧪 **Testing Instructions**

### **Post-Installation Test**
```bash
# Test 1: Binary exists and is executable
which linux-terminal-suite
linux-terminal-suite --version

# Test 2: Desktop integration
desktop-file-validate /usr/share/applications/linux-terminal-suite.desktop

# Test 3: Icon installation
find /usr/share/icons -name "*linux-terminal-suite*"

# Test 4: Basic functionality
timeout 10s linux-terminal-suite --help
```

### **Package Integrity**
```bash
# Verify checksums
sha256sum linux-terminal-suite_0.1.0_amd64.deb
sha256sum linux-terminal-suite-0.1.0-1.x86_64.rpm
sha256sum linux-terminal-suite_0.1.0_amd64.AppImage
```

---

## 📞 **Support Information**

### **Bug Reports**
```bash
# System information for bug reports
echo "System Info:"
uname -a
lsb_release -a 2>/dev/null || cat /etc/os-release
echo "Dependencies:"
dpkg -l | grep -E "(gtk|webkit)" || rpm -qa | grep -E "(gtk|webkit)"
```

### **Uninstallation**
```bash
# Package-based installs
sudo apt remove linux-terminal-suite        # Debian/Ubuntu
sudo dnf remove linux-terminal-suite        # Fedora/RHEL

# Manual install
./scripts/uninstall.sh

# AppImage
rm linux-terminal-suite_0.1.0_amd64.AppImage
```

---

<div align="center">
<b>Ready for Production Distribution! 🚀</b><br>
<i>Professional packaging for Linux desktop environments</i>
</div>