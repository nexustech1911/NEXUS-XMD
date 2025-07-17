const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const tmp = require('tmp');

/**
 * Uploads a WebP file and converts to MP4 using web API
 * @param {Buffer} fileBuffer
 * @returns {Promise<{ status: boolean, data: { url: string } }>}
 */
async function webp2mp4File(fileBuffer) {
    try {
        // Save buffer to a temp file
        const tempFile = tmp.fileSync({ postfix: '.webp' });
        fs.writeFileSync(tempFile.name, fileBuffer);

        const form = new FormData();
        form.append('file', fs.createReadStream(tempFile.name));

        const upload = await axios.post('https://api.anonfiles.com/upload', form, {
            headers: form.getHeaders(),
        });

        const fileUrl = upload?.data?.data?.file?.url?.full;
        if (!fileUrl) throw new Error("Upload failed.");

        // Use ezgif to convert it
        const ezgif = `https://ezgif.com/webp-to-mp4?url=${encodeURIComponent(fileUrl)}`;

        return {
            status: true,
            data: {
                url: ezgif
            }
        };
    } catch (err) {
        console.error("webp2mp4File error:", err);
        return { status: false, data: { url: null } };
    }
}

module.exports = {
    webp2mp4File
};
