const { cmd } = require("../command");
const axios = require('axios');
const fs = require('fs');
const path = require("path");
const AdmZip = require("adm-zip");
const { setCommitHash, getCommitHash } = require('../data/updateDB');

cmd({
    pattern: "update",
    alias: ["upgrade", "sync"],
    react: '🆕',
    desc: "Update the bot to the latest version.",
    category: "system",
    filename: __filename
}, async (client, message, args, { reply, isOwner }) => {
    if (!isOwner) return reply("🚫 Only the owner can run updates.");

    try {
        await reply("🔍 Checking for *NEXUS-XMD* updates...");

        // ✅ Correct GitHub API endpoint for commit hash
        const { data: commitData } = await axios.get("https://api.github.com/repos/nexustech1911/NEXUS-XMD/commits/main");
        const latestCommitHash = commitData.sha;

        const currentHash = await getCommitHash();

        if (latestCommitHash === currentHash) {
            return reply("✅ *NEXUS-XMD is already up-to-date!*");
        }

        await reply("🚀 New update found!\nDownloading latest code...");

        // Download zip
        const zipPath = path.join(__dirname, "latest.zip");
        const { data: zipData } = await axios.get("https://github.com/nexustech1911/NEXUS-XMD/archive/refs/heads/main.zip", {
            responseType: "arraybuffer"
        });
        fs.writeFileSync(zipPath, zipData);

        // Extract
        await reply("📦 Extracting update...");
        const extractPath = path.join(__dirname, "latest");
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(extractPath, true);

        // Replace files
        await reply("🔄 Replacing old files...");
        const sourcePath = path.join(extractPath, "NEXUS-XMD-main");
        const destinationPath = path.join(__dirname, "..");
        copyFolderSync(sourcePath, destinationPath);

        await setCommitHash(latestCommitHash);

        fs.unlinkSync(zipPath);
        fs.rmSync(extractPath, { recursive: true, force: true });

        await reply("✅ *NEXUS-XMD updated successfully! Restarting...*");
        process.exit(0);
    } catch (error) {
        console.error("❌ Update error:", error);
        return reply("❌ Update failed. Please check logs.");
    }
});

// ✅ Skip config/app files
function copyFolderSync(source, target) {
    if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });

    const items = fs.readdirSync(source);
    for (const item of items) {
        const srcPath = path.join(source, item);
        const destPath = path.join(target, item);

        if (["config.js", "app.json"].includes(item)) continue;

        if (fs.lstatSync(srcPath).isDirectory()) {
            copyFolderSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}
