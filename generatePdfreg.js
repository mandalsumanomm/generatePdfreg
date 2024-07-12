// const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

// const generatePdfreg = async (userDetails) => {
//     try {
//         const pdfDoc = await PDFDocument.create();
//         const page = pdfDoc.addPage();

//         page.drawText('User Registration Details', {
//             x: 50,
//             y: page.getHeight() - 50,
//             size: 24,
//             font: await pdfDoc.embedFont(StandardFonts.Helvetica),
//             color: rgb(0, 0, 0),
//         });

//         let y = page.getHeight() - 100;
//         for (const [key, value] of Object.entries(userDetails)) {
//             y -= 20;
//             page.drawText(`${key}: ${value}`, {
//                 x: 50,
//                 y,
//                 size: 12,
//                 font: await pdfDoc.embedFont(StandardFonts.Helvetica),
//                 color: rgb(0, 0, 0),
//             });
//         }

//         const pdfBytes = await pdfDoc.save();
//         return pdfBytes;
//     } catch (error) {
//         throw new Error('Error generating PDF');
//     }
// };

// module.exports = generatePdfreg;


//------------------------------
// const { PDFDocument, rgb } = require('pdf-lib');
// const fetch = require('node-fetch');

// /**
//  * Generates a PDF document for user registration details including a logo.
//  * @param {Object} userDetails - User details for generating the PDF.
//  * @param {string} userDetails.fullName - Full name of the user.
//  * @param {string} userDetails.email - Email address of the user.
//  * @param {string} userDetails.describesYou - Description of the user.
//  * @param {string} userDetails.region - Region of the user.
//  * @param {boolean} userDetails.termsAccepted - Whether terms are accepted.
//  * @param {string} userDetails.legalName - Legal name of the user.
//  * @param {string} userDetails.labelName - Label name of the user.
//  * @param {string} userDetails.governmentId - Government ID of the user.
//  * @param {string} userDetails.governmentAddress - Government address of the user.
//  * @param {string} userDetails.mobileNumber - Mobile number of the user.
//  * @returns {Promise<Uint8Array>} - Generated PDF document as a byte array.
//  */
// const generatePdfreg = async (userDetails) => {
//     try {
//         const pdfDoc = await PDFDocument.create();
//         let page = pdfDoc.addPage();
//         const { width, height } = page.getSize();

//         // Fetch and embed the logo image
//         const logoUrl = 'https://brandroutemedia.s3.ap-south-1.amazonaws.com/BrandRoute-internal/BRAND+MAIN+FILE+1.jpg';
//         const logoResponse = await fetch(logoUrl);
//         const logoBuffer = await logoResponse.arrayBuffer();
//         const logoImage = await pdfDoc.embedJpg(logoBuffer);
//         const logoDims = logoImage.scale(0.02); // Scale down to 2% of original size

//         // Adjust logo position slightly to the right and center vertically
//         const logoX = width / 2 - logoDims.width / 2;
//         const logoY = height - logoDims.height - 40;

//         page.drawImage(logoImage, {
//             x: logoX,
//             y: logoY,
//             width: logoDims.width,
//             height: logoDims.height,
//         });

//         // Add title under the logo
//         const titleFontSize = 18;
//         page.drawText('User Registration Details', {
//             x: 50,
//             y: logoY - 20, // Position it just under the logo
//             size: titleFontSize,
//             color: rgb(0, 0, 0), // Black color
//         });

//         // Add user details
//         const userDetailsText = `
// Full Name: ${userDetails.fullName}
// Email: ${userDetails.email}
// Description: ${userDetails.describesYou}
// Region: ${userDetails.region}
// Terms Accepted: ${userDetails.termsAccepted ? 'Yes' : 'No'}
// Legal Name: ${userDetails.legalName}
// Label Name: ${userDetails.labelName}
// Government ID: ${userDetails.governmentId}
// Government Address: ${userDetails.governmentAddress}
// Mobile Number: ${userDetails.mobileNumber}
// `;

//         const userDetailsLines = userDetailsText.trim().split('\n').map(line => line.trim());
//         let yPosition = height - logoDims.height - 120; // Starting position for user details
//         const fontSize = 12;
//         const lineHeight = fontSize * 1.2; // Estimated line height

//         for (const line of userDetailsLines) {
//             if (yPosition <= 50) {
//                 page = pdfDoc.addPage();
//                 yPosition = height - 50;
//             }
//             page.drawText(line, { x: 50, y: yPosition, size: fontSize });
//             yPosition -= lineHeight;
//         }

//         // Add Terms of Service section
//         const termsOfServiceText = `
// Digital Distribution Terms of Service
// Grant of Rights: (Company/ Label /Person) Brandroute Media the exclusive global rights to:
// - Serve as the exclusive licensor and digital distributor of the Client's Content to Resellers worldwide.
// - Function as the digital asset manager for the Client's Content on platforms like YouTube, managing digital rights, content ID, fingerprinting, and monetization worldwide.
// - Reproduce and transform the Client's Content into digitally encoded files, assign ISRC codes, and manage the collection, administration, and distribution of revenues derived from the Resellers' utilization of the Client's Content.

// Client Responsibilities:
// - Secure all necessary rights for Brandroute Media to legally reproduce and distribute the Content.
// - Deliver content to Brandroute Media with all relevant details (e.g., composition identification, album titles, artist(s), catalog and track numbers, explicit lyric indicators).

// Company Responsibilities:
// - Deploy commercially reasonable efforts in the promotion and marketing of the Client's Content across suitable digital platforms and services.

// Compensation:
// - For music distribution and YouTube Content ID Creation, Brandroute Media will allocate 80% of gross revenue to the Client and retain 20% as service fees.

// Fingerprinting Terms And Service
// Digital Rights Management:
// - Brandroute Media will manage digital rights, content ID, fingerprinting, and monetization worldwide for the Client's Content on platforms like YouTube.

// Ownership Requirements for Content ID Eligibility:
// - The Client must own or control 100% of the melodies, lyrics, composition, and audio master to be eligible for Content ID.

// Prohibited Manipulations and Viral Marketing Efforts:
// - Any content artificially enhancing virality or creating multiple claims through paid services is strictly prohibited. The Client agrees not to engage in or submit content that manipulates claims or pays for content to be used as intros or outros on YouTube videos or any other content of any sources.

// Restrictions on Remixes and Cover Songs:
// - The submission of remixes or cover songs is prohibited unless the Client owns the original song outright or has secured a mechanical license demonstrating such ownership.

// Indemnification and Limitation of Liability:
// - The Client agrees to indemnify, defend, and hold harmless Brandroute Media from any claims, liabilities, damages, and expenses arising from or related to any breach of the Client's warranties, representations, covenants, or obligations under this Agreement or from any infringement or alleged infringement of third party intellectual property rights by the Content provided by the Client.
// `;

//         const termsOfServiceLines = termsOfServiceText.trim().split('\n').map(line => line.trim());

//         yPosition -= 30; // Add space before the terms section
//         const wrapOptions = { width: width - 100 }; // Adjust width as needed
//         const maxCharsPerLine = 80; // Maximum characters per line to manually wrap text

//         for (const line of termsOfServiceLines) {
//             let remainingText = line;
//             while (remainingText.length > maxCharsPerLine) {
//                 const lineToDraw = remainingText.substring(0, maxCharsPerLine);
//                 if (yPosition - lineHeight < 50 - lineHeight - 100) {
//                     page = pdfDoc.addPage();
//                     yPosition = height - 50;
//                 }
//                 page.drawText(lineToDraw, { x: 50, y: yPosition, size: fontSize });
//                 remainingText = remainingText.substring(maxCharsPerLine);
//                 yPosition -= lineHeight; // Adjust position for next line
//             }
//             if (yPosition - lineHeight < 50 - lineHeight - 100) {
//                 page = pdfDoc.addPage();
//                 yPosition = height - 50;
//             }
//             page.drawText(remainingText, { x: 50, y: yPosition, size: fontSize });
//             yPosition -= lineHeight; // Adjust position for next line
//         }

//         const pdfBytes = await pdfDoc.save();
//         return pdfBytes;
//     } catch (error) {
//         console.error('Error generating PDF:', error);
//         throw error;
//     }
// };

// module.exports = generatePdfreg;


//------------------------
// const { PDFDocument, rgb } = require('pdf-lib');
// const fetch = require('node-fetch');

// /**
//  * Generates a PDF document for user registration details including a logo and digital signature.
//  * @param {Object} userDetails - User details for generating the PDF.
//  * @param {string} userDetails.fullName - Full name of the user.
//  * @param {string} userDetails.email - Email address of the user.
//  * @param {string} userDetails.describesYou - Description of the user.
//  * @param {string} userDetails.region - Region of the user.
//  * @param {boolean} userDetails.termsAccepted - Whether terms are accepted.
//  * @param {string} userDetails.legalName - Legal name of the user.
//  * @param {string} userDetails.labelName - Label name of the user.
//  * @param {string} userDetails.governmentId - Government ID of the user.
//  * @param {string} userDetails.governmentAddress - Government address of the user.
//  * @param {string} userDetails.mobileNumber - Mobile number of the user.
//  * @param {Object} userDetails.digitalSignatureAttachment - Digital signature attachment details.
//  * @param {string} userDetails.digitalSignatureAttachment._id - ID of the digital signature attachment.
//  * @param {string} userDetails.digitalSignatureAttachment.filePath - File path or URL of the digital signature.
//  * @returns {Promise<Uint8Array>} - Generated PDF document as a byte array.
//  */
// const generatePdfreg = async (userDetails) => {
//     try {
//         // Ensure digitalSignatureAttachment is provided with filePath
//         if (!userDetails.digitalSignatureAttachment || !userDetails.digitalSignatureAttachment.filePath) {
//             throw new Error('Digital signature attachment filePath is missing');
//         }

//         const pdfDoc = await PDFDocument.create();
//         let page = pdfDoc.addPage();
//         const { width, height } = page.getSize();

//         // Fetch and embed the logo image (replace with your logo URL)
//         const logoUrl = 'https://brandroutemedia.s3.ap-south-1.amazonaws.com/BrandRoute-internal/BRAND+MAIN+FILE+1.jpg';
//         const logoResponse = await fetch(logoUrl);
//         const logoBuffer = await logoResponse.arrayBuffer();
//         const logoImage = await pdfDoc.embedJpg(logoBuffer);
//         const logoDims = logoImage.scale(0.02); // Scale down to 2% of original size

//         // Adjust logo position slightly to the right and center vertically
//         const logoX = width / 2 - logoDims.width / 2;
//         const logoY = height - logoDims.height - 40;

//         page.drawImage(logoImage, {
//             x: logoX,
//             y: logoY,
//             width: logoDims.width,
//             height: logoDims.height,
//         });

//         // Add title under the logo
//         const titleFontSize = 18;
//         page.drawText('User Registration Details', {
//             x: 50,
//             y: logoY - 20, // Position it just under the logo
//             size: titleFontSize,
//             color: rgb(0, 0, 0), // Black color
//         });

//         // Add user details
//         const userDetailsText = `
// Full Name: ${userDetails.fullName}
// Email: ${userDetails.email}
// Description: ${userDetails.describesYou}
// Region: ${userDetails.region}
// Terms Accepted: ${userDetails.termsAccepted ? 'Yes' : 'No'}
// Legal Name: ${userDetails.legalName}
// Label Name: ${userDetails.labelName}
// Government ID: ${userDetails.governmentId}
// Government Address: ${userDetails.governmentAddress}
// Mobile Number: ${userDetails.mobileNumber}
// `;

//         const userDetailsLines = userDetailsText.trim().split('\n').map(line => line.trim());
//         let yPosition = height - logoDims.height - 120; // Starting position for user details
//         const fontSize = 12;
//         const lineHeight = fontSize * 1.2; // Estimated line height

//         for (const line of userDetailsLines) {
//             if (yPosition <= 50) {
//                 page = pdfDoc.addPage();
//                 yPosition = height - 50;
//             }
//             page.drawText(line, { x: 50, y: yPosition, size: fontSize });
//             yPosition -= lineHeight;
//         }

//         // Embed digital signature image
//         const digitalSignatureUrl = userDetails.digitalSignatureAttachment.filePath;
//         const digitalSignatureResponse = await fetch(digitalSignatureUrl);
//         if (!digitalSignatureResponse.ok) {
//             throw new Error(`Failed to fetch digital signature image: ${digitalSignatureResponse.statusText}`);
//         }
//         const digitalSignatureBuffer = await digitalSignatureResponse.arrayBuffer();

//         // Try to embed the digital signature as a PNG image
//         let digitalSignatureImage;
//         try {
//             digitalSignatureImage = await pdfDoc.embedPng(digitalSignatureBuffer);
//         } catch (pngError) {
//             // If it fails, try to embed as a JPG image
//             try {
//                 digitalSignatureImage = await pdfDoc.embedJpg(digitalSignatureBuffer);
//             } catch (jpgError) {
//                 throw new Error('Failed to embed digital signature image as PNG or JPG');
//             }
//         }

//         const signatureDims = digitalSignatureImage.scale(0.15); // Scale down to 15% of original size

//         // Position digital signature image at the bottom right corner
//         const signatureX = width - signatureDims.width - 50;
//         const signatureY = 50;

//         page.drawImage(digitalSignatureImage, {
//             x: signatureX,
//             y: signatureY,
//             width: signatureDims.width,
//             height: signatureDims.height,
//         });

//         const pdfBytes = await pdfDoc.save();
//         return pdfBytes;

//     } catch (error) {
//         console.error('Error generating PDF:', error);
//         throw error;
//     }
// };

// module.exports = generatePdfreg;
//---------------------


// const { PDFDocument, rgb } = require('pdf-lib');
// const fetch = require('node-fetch');

// /**
//  * Generates a PDF document for user registration details including a logo and digital signature.
//  * @param {Object} userDetails - User details for generating the PDF.
//  * @param {string} userDetails.fullName - Full name of the user.
//  * @param {string} userDetails.email - Email address of the user.
//  * @param {string} userDetails.describesYou - Description of the user.
//  * @param {string} userDetails.region - Region of the user.
//  * @param {boolean} userDetails.termsAccepted - Whether terms are accepted.
//  * @param {string} userDetails.legalName - Legal name of the user.
//  * @param {string} userDetails.labelName - Label name of the user.
//  * @param {string} userDetails.governmentId - Government ID of the user.
//  * @param {string} userDetails.governmentAddress - Government address of the user.
//  * @param {string} userDetails.mobileNumber - Mobile number of the user.
//  * @param {Object} userDetails.digitalSignatureAttachment - Digital signature attachment details.
//  * @param {string} userDetails.digitalSignatureAttachment._id - ID of the digital signature attachment.
//  * @param {string} userDetails.digitalSignatureAttachment.filePath - File path or URL of the digital signature.
//  * @returns {Promise<Uint8Array>} - Generated PDF document as a byte array.
//  */
// const generatePdfreg = async (userDetails) => {
//     try {
//         // Ensure digitalSignatureAttachment is provided with filePath
//         if (!userDetails.digitalSignatureAttachment || !userDetails.digitalSignatureAttachment.filePath) {
//             throw new Error('Digital signature attachment filePath is missing');
//         }

//         const pdfDoc = await PDFDocument.create();
//         let page = pdfDoc.addPage();
//         const { width, height } = page.getSize();

//         // Fetch and embed the logo image (replace with your logo URL)
//         const logoUrl = 'https://brandroutemedia.s3.ap-south-1.amazonaws.com/BrandRoute-internal/BRAND+MAIN+FILE+1.jpg';
//         const logoResponse = await fetch(logoUrl);
//         const logoBuffer = await logoResponse.arrayBuffer();
//         const logoImage = await pdfDoc.embedJpg(logoBuffer);
//         const logoDims = logoImage.scale(0.02); // Scale down to 2% of original size

//         // Adjust logo position slightly to the right and center vertically
//         const logoX = width / 2 - logoDims.width / 2;
//         const logoY = height - logoDims.height - 40;

//         page.drawImage(logoImage, {
//             x: logoX,
//             y: logoY,
//             width: logoDims.width,
//             height: logoDims.height,
//         });

//         // Add title under the logo
//         const titleFontSize = 18;
//         page.drawText('User Registration Details', {
//             x: 50,
//             y: logoY - 20, // Position it just under the logo
//             size: titleFontSize,
//             color: rgb(0, 0, 0), // Black color
//         });

//         // Add user details
//         const userDetailsText = `
// Full Name: ${userDetails.fullName}
// Email: ${userDetails.email}
// Description: ${userDetails.describesYou}
// Region: ${userDetails.region}
// Terms Accepted: ${userDetails.termsAccepted ? 'Yes' : 'No'}
// Legal Name: ${userDetails.legalName}
// Label Name: ${userDetails.labelName}
// Government ID: ${userDetails.governmentId}
// Government Address: ${userDetails.governmentAddress}
// Mobile Number: ${userDetails.mobileNumber}
// `;

//         const userDetailsLines = userDetailsText.trim().split('\n').map(line => line.trim());
//         let yPosition = height - logoDims.height - 120; // Starting position for user details
//         const fontSize = 12;
//         const lineHeight = fontSize * 1.2; // Estimated line height

//         for (const line of userDetailsLines) {
//             if (yPosition <= 50) {
//                 page = pdfDoc.addPage();
//                 yPosition = height - 50;
//             }
//             page.drawText(line, { x: 50, y: yPosition, size: fontSize });
//             yPosition -= lineHeight;
//         }

//         // Embed digital signature image
//         const digitalSignatureUrl = userDetails.digitalSignatureAttachment.filePath;
//         const digitalSignatureResponse = await fetch(digitalSignatureUrl);
//         if (!digitalSignatureResponse.ok) {
//             throw new Error(`Failed to fetch digital signature image: ${digitalSignatureResponse.statusText}`);
//         }
//         const digitalSignatureBuffer = await digitalSignatureResponse.arrayBuffer();

//         // Try to embed the digital signature as a PNG image
//         let digitalSignatureImage;
//         try {
//             digitalSignatureImage = await pdfDoc.embedPng(digitalSignatureBuffer);
//         } catch (pngError) {
//             // If it fails, try to embed as a JPG image
//             try {
//                 digitalSignatureImage = await pdfDoc.embedJpg(digitalSignatureBuffer);
//             } catch (jpgError) {
//                 throw new Error('Failed to embed digital signature image as PNG or JPG');
//             }
//         }

//         const signatureDims = digitalSignatureImage.scale(0.15); // Scale down to 15% of original size

//         // Position digital signature image at the bottom right corner
//         const signatureX = width - signatureDims.width - 50;
//         const signatureY = 50;

//         page.drawImage(digitalSignatureImage, {
//             x: signatureX,
//             y: signatureY,
//             width: signatureDims.width,
//             height: signatureDims.height,
//         });

//         // Add additional terms and conditions
//         const additionalTerms = `
// Digital Distribution Terms of Service
// Grant of Rights: (Company/ Label /Person) Brandroute Media the exclusive global rights to:
// - Serve as the exclusive licensor and digital distributor of the Client's Content to Resellers worldwide.
// - Function as the digital asset manager for the Client's Content on platforms like YouTube, managing digital rights, content ID, fingerprinting, and monetization worldwide.
// - Reproduce and transform the Client's Content into digitally encoded files, assign ISRC codes, and manage the collection, administration, and distribution of revenues derived from the Resellers' utilization of the Client's Content.

// Client Responsibilities:
// - Secure all necessary rights for Brandroute Media to legally reproduce and distribute the Content.
// - Deliver content to Brandroute Media with all relevant details (e.g., composition identification, album titles, artist(s), catalog and track numbers, explicit lyric indicators).

// Company Responsibilities:
// - Deploy commercially reasonable efforts in the promotion and marketing of the Client's Content across suitable digital platforms and services.

// Compensation:
// - For music distribution and YouTube Content ID Creation, Brandroute Media will allocate 80% of gross revenue to the Client and retain 20% as service fees.

// Fingerprinting Terms And Service
// Digital Rights Management:
// - Brandroute Media will manage digital rights, content ID, fingerprinting, and monetization worldwide for the Client's Content on platforms like YouTube.

// Ownership Requirements for Content ID Eligibility:
// - The Client must own or control 100% of the melodies, lyrics, composition, and audio master to be eligible for Content ID.

// Prohibited Manipulations and Viral Marketing Efforts:
// - Any content artificially enhancing virality or creating multiple claims through paid services is strictly prohibited. The Client agrees not to engage in or submit content that manipulates claims or pays for content to be used as intros or outros on YouTube videos or any other content of any sources.

// Restrictions on Remixes and Cover Songs:
// - The submission of remixes or cover songs is prohibited unless the Client owns the original song outright or has secured a mechanical license demonstrating such ownership.

// Indemnification and Limitation of Liability:
// - The Client agrees to indemnify, defend, and hold harmless Brandroute Media from any claims, liabilities, damages, and expenses arising from or related to any breach of the Client's warranties, representations, covenants, or obligations under this Agreement or from any infringement or alleged infringement of third party intellectual property rights by the Content provided by the Client.

// MCN Terms Of Service

// 1. Terms of Service:
// 1.1 MCN Services: Brandroute Media will distribute seventy percent (70%) of gross compensation to the Client as Master Proceeds and retain thirty percent (30%) as its Service Fee, reflecting the additional value and support provided through these services.
// 1.2 Created Channel: It is not possible to remove the owner access from channels that were created from CMS or MCN. This includes the email - zojakchannels@brandroutemedia.com, as well as any of our official email addresses. Payments will be held if the owner's access is removed.
// 1.3 Linked Channel: When we link your channel to our MCN, we need to put the manager access in our email (zojakchannels@brandroutemedia.com or any of our official emails). Payments will be held if the manager's access is removed.
// 1.4 Minimum Period: All channels that are created and linked must be kept on our network for a minimum of two years.
// 1.5 Content ID: Content ID cannot be enabled for your channel.
// 1.6 Copyright Strike: If the Client is unable to remove a copyright strike within 14 business days (excluding Saturdays, Sundays, and national holidays), payment will be held.
// 1.7 Cover & Remix Songs: We are not allowed to upload any cover or remix songs to CMS or MCN-connected channels. Payments will be held if this happens. However, covers and remixes are allowed if they meet the following conditions:
// - The remixes and covers must be works that you (the Client) have produced.
// - The works are officially licensed to you or your company.
// - You will be fully responsible if any copyright issues arise.

// For your convenience, please feel free to check this PDF for any mistakes or omissions.
//         `;

//         const termsLines = additionalTerms.trim().split('\n').map(line => line.trim());
//         const termsFontSize = 10;
//         const termsLineHeight = termsFontSize * 1.2;

//         for (const line of termsLines) {
//             if (yPosition <= 50) {
//                 page = pdfDoc.addPage();
//                 yPosition = height - 50;
//             }
//             page.drawText(line, { x: 50, y: yPosition, size: termsFontSize });
//             yPosition -= termsLineHeight;
//         }

//         const pdfBytes = await pdfDoc.save();
//         return pdfBytes;
//     } catch (error) {
//         console.error('Error generating PDF:', error);
//         throw error;
//     }
// };

// module.exports = generatePdfreg;
//------------
// const { PDFDocument, rgb } = require('pdf-lib');
// const fetch = require('node-fetch');

// /**
//  * Generates a PDF document for user registration details including a logo and digital signature.
//  * @param {Object} userDetails - User details for generating the PDF.
//  * @param {string} userDetails.fullName - Full name of the user.
//  * @param {string} userDetails.email - Email address of the user.
//  * @param {string} userDetails.describesYou - Description of the user.
//  * @param {string} userDetails.region - Region of the user.
//  * @param {boolean} userDetails.termsAccepted - Whether terms are accepted.
//  * @param {string} userDetails.legalName - Legal name of the user.
//  * @param {string} userDetails.labelName - Label name of the user.
//  * @param {string} userDetails.governmentId - Government ID of the user.
//  * @param {string} userDetails.governmentAddress - Government address of the user.
//  * @param {string} userDetails.mobileNumber - Mobile number of the user.
//  * @param {Object} userDetails.digitalSignatureAttachment - Digital signature attachment details.
//  * @param {string} userDetails.digitalSignatureAttachment._id - ID of the digital signature attachment.
//  * @param {string} userDetails.digitalSignatureAttachment.filePath - File path or URL of the digital signature.
//  * @returns {Promise<Uint8Array>} - Generated PDF document as a byte array.
//  */
// const generatePdfreg = async (userDetails) => {
//     try {
//         // Ensure digitalSignatureAttachment is provided with filePath
//         if (!userDetails.digitalSignatureAttachment || !userDetails.digitalSignatureAttachment.filePath) {
//             throw new Error('Digital signature attachment filePath is missing');
//         }

//         const pdfDoc = await PDFDocument.create();
//         let page = pdfDoc.addPage();
//         const { width, height } = page.getSize();

//         // Fetch and embed the logo image (replace with your logo URL)
//         const logoUrl = 'https://brandroutemedia.s3.ap-south-1.amazonaws.com/BrandRoute-internal/BRAND+MAIN+FILE+1.jpg';
//         const logoResponse = await fetch(logoUrl);
//         const logoBuffer = await logoResponse.arrayBuffer();
//         const logoImage = await pdfDoc.embedJpg(logoBuffer);
//         const logoDims = logoImage.scale(0.02); // Scale down to 2% of original size

//         // Adjust logo position slightly to the right and center vertically
//         const logoX = width / 2 - logoDims.width / 2;
//         const logoY = height - logoDims.height - 40;

//         page.drawImage(logoImage, {
//             x: logoX,
//             y: logoY,
//             width: logoDims.width,
//             height: logoDims.height,
//         });

//         // Add title under the logo
//         // const titleFontSize = 18;
//         // page.drawText('User Registration Details', {
//         //     x: 50,
//         //     y: logoY - 20, // Position it just under the logo
//         //     size: titleFontSize,
//         //     color: rgb(0, 0, 0), // Black color
//         // });

//         // Add user details
//         const userDetailsText = `
// Full Name: ${userDetails.fullName}
// Email: ${userDetails.email}
// Description: ${userDetails.describesYou}
// Region: ${userDetails.region}
// Legal Name: ${userDetails.legalName}
// Label Name: ${userDetails.labelName}
// Government ID: ${userDetails.governmentId}
// Government Address: ${userDetails.governmentAddress}
// Mobile Number: ${userDetails.mobileNumber}
// `;

//         const userDetailsLines = userDetailsText.trim().split('\n').map(line => line.trim());
//         let yPosition = height - logoDims.height - 120; // Starting position for user details
//         const fontSize = 12;
//         const lineHeight = fontSize * 1.2; // Estimated line height

//         for (const line of userDetailsLines) {
//             if (yPosition <= 50) {
//                 page = pdfDoc.addPage();
//                 yPosition = height - 50;
//             }
//             page.drawText(line, { x: 50, y: yPosition, size: fontSize });
//             yPosition -= lineHeight;
//         }

//         // Add additional terms and conditions
//         const additionalTerms = `
// Digital Distribution Terms of Service
// Grant of Rights: (Company/ Label /Person) Brandroute Media the exclusive global rights to:
// - Serve as the exclusive licensor and digital distributor of the Client's Content to Resellers worldwide.
// - Function as the digital asset manager for the Client's Content on platforms like YouTube, managing digital rights, content ID, fingerprinting, and monetization worldwide.
// - Reproduce and transform the Client's Content into digitally encoded files, assign ISRC codes, and manage the collection, administration, and distribution of revenues derived from the Resellers' utilization of the Client's Content.

// Client Responsibilities:
// - Secure all necessary rights for Brandroute Media to legally reproduce and distribute the Content.
// - Deliver content to Brandroute Media with all relevant details (e.g., composition identification, album titles, artist(s), catalog and track numbers, explicit lyric indicators).

// Company Responsibilities:
// - Deploy commercially reasonable efforts in the promotion and marketing of the Client's Content across suitable digital platforms and services.

// Compensation:
// - For music distribution and YouTube Content ID Creation, Brandroute Media will allocate 80% of gross revenue to the Client and retain 20% as service fees.

// Fingerprinting Terms And Service
// Digital Rights Management:
// - Brandroute Media will manage digital rights, content ID, fingerprinting, and monetization worldwide for the Client's Content on platforms like YouTube.

// Ownership Requirements for Content ID Eligibility:
// - The Client must own or control 100% of the melodies, lyrics, composition, and audio master to be eligible for Content ID.

// Prohibited Manipulations and Viral Marketing Efforts:
// - Any content artificially enhancing virality or creating multiple claims through paid services is strictly prohibited. The Client agrees not to engage in or submit content that manipulates claims or pays for content to be used as intros or outros on YouTube videos or any other content of any sources.

// Restrictions on Remixes and Cover Songs:
// - The submission of remixes or cover songs is prohibited unless the Client owns the original song outright or has secured a mechanical license demonstrating such ownership.

// Indemnification and Limitation of Liability:
// - The Client agrees to indemnify, defend, and hold harmless Brandroute Media from any claims, liabilities, damages, and expenses arising from or related to any breach of the Client's warranties, representations, covenants, or obligations under this Agreement or from any infringement or alleged infringement of third party intellectual property rights by the Content provided by the Client.

// MCN Terms Of Service

// 1. Terms of Service:
// 1.1 MCN Services: Brandroute Media will distribute seventy percent (70%) of gross compensation to the Client as Master Proceeds and retain thirty percent (30%) as its Service Fee, reflecting the additional value and support provided through these services.
// 1.2 Created Channel: It is not possible to remove the owner access from channels that were created from CMS or MCN. This includes the email - zojakchannels@brandroutemedia.com, as well as any of our official email addresses. Payments will be held if the owner's access is removed.
// 1.3 Linked Channel: When we link your channel to our MCN, we need to put the manager access in our email (zojakchannels@brandroutemedia.com or any of our official emails). Payments will be held if the manager's access is removed.
// 1.4 Minimum Period: All channels that are created and linked must be kept on our network for a minimum of two years.
// 1.5 Content ID: Content ID cannot be enabled for your channel.
// 1.6 Copyright Strike: If the Client is unable to remove a copyright strike within 14 business days (excluding Saturdays, Sundays, and national holidays), payment will be held.
// 1.7 Cover & Remix Songs: We are not allowed to upload any cover or remix songs to CMS or MCN-connected channels. Payments will be held if this happens. However, covers and remixes are allowed if they meet the following conditions:
// - The remixes and covers must be works that you (the Client) have produced.
// - The works are officially licensed to you or your company.
// - You will be fully responsible if any copyright issues arise.

// For your convenience, please feel free to check this PDF for any mistakes or omissions.
//         `;

//         const termsLines = additionalTerms.trim().split('\n').map(line => line.trim());
//         const termsFontSize = 10;
//         const termsLineHeight = termsFontSize * 1.2;

//         for (const line of termsLines) {
//             if (yPosition <= 50) {
//                 page = pdfDoc.addPage();
//                 yPosition = height - 50;
//             }
//             page.drawText(line, { x: 50, y: yPosition, size: termsFontSize });
//             yPosition -= termsLineHeight;
//         }

//         // Embed digital signature image
//         const digitalSignatureUrl = userDetails.digitalSignatureAttachment.filePath;
//         const digitalSignatureResponse = await fetch(digitalSignatureUrl);
//         if (!digitalSignatureResponse.ok) {
//             throw new Error(`Failed to fetch digital signature image: ${digitalSignatureResponse.statusText}`);
//         }
//         const digitalSignatureBuffer = await digitalSignatureResponse.arrayBuffer();

//         // Try to embed the digital signature as a PNG image
//         let digitalSignatureImage;
//         try {
//             digitalSignatureImage = await pdfDoc.embedPng(digitalSignatureBuffer);
//         } catch (pngError) {
//             // If PNG embedding fails, try to embed as a JPG image
//             try {
//                 digitalSignatureImage = await pdfDoc.embedJpg(digitalSignatureBuffer);
//             } catch (jpgError) {
//                 throw new Error('Failed to embed digital signature as PNG or JPG image');
//             }
//         }

//         const digitalSignatureDims = digitalSignatureImage.scale(0.1); // Scale down to 10% of original size

//         // Ensure there is enough space at the bottom for the digital signature, label, and date
//         if (yPosition <= 100) {
//             page = pdfDoc.addPage();
//             yPosition = height - 50;
//         }

//         // Add digital signature at the end of the page
//         yPosition -= 40; // Adjust position for spacing

//         page.drawImage(digitalSignatureImage, {
//             x: 50,
//             y: yPosition,
//             width: digitalSignatureDims.width,
//             height: digitalSignatureDims.height,
//         });

//         // Add label "Customer Signature" under the digital signature
//         const signatureLabel = 'Customer Signature';
//         page.drawText(signatureLabel, {
//             x: 50,
//             y: yPosition - 15,
//             size: 12,
//             color: rgb(0, 0, 0),
//         });

//         // Add the current date under the "Customer Signature" label
//         const currentDate = new Date().toLocaleDateString();
//         page.drawText(currentDate, {
//             x: 50,
//             y: yPosition - 30,
//             size: 12,
//             color: rgb(0, 0, 0),
//         });

//         const pdfBytes = await pdfDoc.save();
//         return pdfBytes;
//     } catch (error) {
//         console.error('Error generating PDF:', error);
//         throw error;
//     }
// };

// module.exports = generatePdfreg;



const { PDFDocument, rgb } = require('pdf-lib');
const fetch = require('node-fetch');

/**
 * Generates a PDF document for user registration details including a logo and digital signature.
 * @param {Object} userDetails - User details for generating the PDF.
 * @param {string} userDetails.fullName - Full name of the user.
 * @param {string} userDetails.email - Email address of the user.
 * @param {string} userDetails.describesYou - Description of the user.
 * @param {string} userDetails.region - Region of the user.
 * @param {boolean} userDetails.termsAccepted - Whether terms are accepted.
 * @param {string} userDetails.legalName - Legal name of the user.
 * @param {string} userDetails.labelName - Label name of the user.
 * @param {string} userDetails.governmentId - Government ID of the user.
 * @param {string} userDetails.governmentAddress - Government address of the user.
 * @param {string} userDetails.mobileNumber - Mobile number of the user.
 * @param {Object} userDetails.digitalSignatureAttachment - Digital signature attachment details.
 * @param {string} userDetails.digitalSignatureAttachment._id - ID of the digital signature attachment.
 * @param {string} userDetails.digitalSignatureAttachment.filePath - File path or URL of the digital signature.
 * @returns {Promise<Uint8Array>} - Generated PDF document as a byte array.
 */
const generatePdfreg = async (userDetails) => {
    try {
        // Ensure digitalSignatureAttachment is provided with filePath
        if (!userDetails.digitalSignatureAttachment || !userDetails.digitalSignatureAttachment.filePath) {
            throw new Error('Digital signature attachment filePath is missing');
        }

        const pdfDoc = await PDFDocument.create();
        let page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        const margin = 50; // Set your desired margin

        // Fetch and embed the logo image (replace with your logo URL)
        const logoUrl = 'https://brandroutemedia.s3.ap-south-1.amazonaws.com/BrandRoute-internal/BRAND+MAIN+FILE+1.jpg';
        const logoResponse = await fetch(logoUrl);
        const logoBuffer = await logoResponse.arrayBuffer();
        const logoImage = await pdfDoc.embedJpg(logoBuffer);
        const logoDims = logoImage.scale(0.02); // Scale down to 2% of original size

        // Adjust logo position slightly to the right and center vertically
        const logoX = width / 2 - logoDims.width / 2;
        const logoY = height - logoDims.height - margin;

        page.drawImage(logoImage, {
            x: logoX,
            y: logoY,
            width: logoDims.width,
            height: logoDims.height,
        });

        // Add user details
        const userDetailsText = `
 Full Name: ${userDetails.fullName}
 Email: ${userDetails.email}
 Description: ${userDetails.describesYou}
 Region: ${userDetails.region}
 Legal Name: ${userDetails.legalName}
 Label Name: ${userDetails.labelName}
 Government ID: ${userDetails.governmentId}
 Government Address: ${userDetails.governmentAddress}
 Mobile Number: ${userDetails.mobileNumber}
`;

        const userDetailsLines = userDetailsText.trim().split('\n').map(line => line.trim());
        let yPosition = height - logoDims.height - 2 * margin; // Starting position for user details
        const fontSize = 12;
        const lineHeight = fontSize * 1.2; // Estimated line height

        for (const line of userDetailsLines) {
            if (yPosition <= margin) {
                page = pdfDoc.addPage();
                yPosition = height - margin;
            }
            page.drawText(line, { x: margin, y: yPosition, size: fontSize });
            yPosition -= lineHeight;
        }

        // Add additional terms and conditions
        const additionalTerms = `
Digital Distribution Terms of Service
Grant of Rights: (Company/ Label /Person) Brandroute Media the exclusive global rights to:
- Serve as the exclusive licensor and digital distributor of the Client's Content to Resellers worldwide.
- Function as the digital asset manager for the Client's Content on platforms like YouTube, managing digital rights,
  content ID, fingerprinting, and monetization worldwide.
- Reproduce and transform the Client's Content into digitally encoded files, assign ISRC codes, and manage the
  collection, administration, and distribution of revenues derived from the Resellers' utilization of the Client's
  Content.

Client Responsibilities:
- Secure all necessary rights for Brandroute Media to legally reproduce and distribute the Content.
- Deliver content to Brandroute Media with all relevant details (e.g., composition identification, album titles, artist(s),
 catalog and track numbers, explicit lyric indicators).

Company Responsibilities:
- Deploy commercially reasonable efforts in the promotion and marketing of the Client's Content across suitable
 digital platforms and services.

Compensation:
- For music distribution and YouTube Content ID Creation, Brandroute Media will allocate 80% of gross revenue
 to the Client and retain 20% as service fees.

Fingerprinting Terms And Service
Digital Rights Management:
- Brandroute Media will manage digital rights, content ID, fingerprinting, and monetization worldwide for the Client's
 Content on platforms like YouTube.

Ownership Requirements for Content ID Eligibility:
- The Client must own or control 100% of the melodies, lyrics, composition, and audio master to be eligible for
 Content ID.

Prohibited Manipulations and Viral Marketing Efforts:
- Any content artificially enhancing virality or creating multiple claims through paid services is strictly prohibited.
 The Client agrees not to engage in or submit content that manipulates claims or pays for content to be used as 
 intros or outros on YouTube videos or any other content of any sources.

Restrictions on Remixes and Cover Songs:
- The submission of remixes or cover songs is prohibited unless the Client owns the original song outright or has
 secured a mechanical license demonstrating such ownership.

Indemnification and Limitation of Liability:
- The Client agrees to indemnify, defend, and hold harmless Brandroute Media from any claims, liabilities,
 damages, and expenses arising from or related to any breach of the Client's warranties, representations, 
 covenants, or obligations under this Agreement or from any infringement or alleged infringement of 
 third party intellectual property rights by the Content provided by the Client.

MCN Terms Of Service

1. Terms of Service:
1.1 MCN Services: Brandroute Media will distribute seventy percent (70%) of gross compensation to the Client
 as Master Proceeds and retain thirty percent (30%) as its Service Fee, reflecting the additional value 
 and support provided through these services.
1.2 Created Channel: It is not possible to remove the owner access from channels that were created from CMS
 or MCN. This includes the email - zojakchannels@brandroutemedia.com, as well as any of our official email
  addresses. Payments will be held if the owner's access is removed.
1.3 Linked Channel: When we link your channel to our MCN, we need to put the manager access in our email
 (zojakchannels@brandroutemedia.com or any of our official emails). Payments will be held if the 
manager's access is removed.
1.4 Minimum Period: All channels that are created and linked must be kept on our network for a minimum of 
two years.
1.5 Content ID: Content ID cannot be enabled for your channel.
1.6 Copyright Strike: If the Client is unable to remove a copyright strike within 14 business days (excluding
 Saturdays, Sundays, and national holidays), payment will be held.
1.7 Cover & Remix Songs: We are not allowed to upload any cover or remix songs to CMS or MCN-connected 
channels. Payments will be held if this happens. However, covers and remixes are allowed if they meet
 the following conditions:
- The remixes and covers must be works that you (the Client) have produced.
- The works are officially licensed to you or your company.
- You will be fully responsible if any copyright issues arise.

For your convenience, please feel free to check this PDF for any mistakes or omissions.
        `;

        const termsLines = additionalTerms.trim().split('\n').map(line => line.trim());
        const termsFontSize = 10;
        const termsLineHeight = termsFontSize * 1.2;

        for (const line of termsLines) {
            if (yPosition <= margin) {
                page = pdfDoc.addPage();
                yPosition = height - margin;
            }
            page.drawText(line, { x: margin, y: yPosition, size: termsFontSize });
            yPosition -= termsLineHeight;
        }

        // Embed digital signature image
        const digitalSignatureUrl = userDetails.digitalSignatureAttachment.filePath;
        const digitalSignatureResponse = await fetch(digitalSignatureUrl);
        if (!digitalSignatureResponse.ok) {
            throw new Error(`Failed to fetch digital signature image: ${digitalSignatureResponse.statusText}`);
        }
        const digitalSignatureBuffer = await digitalSignatureResponse.arrayBuffer();
        let digitalSignatureImage;

        try {
            digitalSignatureImage = await pdfDoc.embedPng(digitalSignatureBuffer);
        } catch (pngError) {
            // PNG embedding fails, try to embed as a JPG image
            try {
                digitalSignatureImage = await pdfDoc.embedJpg(digitalSignatureBuffer);
            } catch (jpgError) {
                throw new Error('Failed to embed digital signature as PNG or JPG image');
            }
        }

        const digitalSignatureDims = digitalSignatureImage.scale(0.1); // Scale down to 10% of original size

        // Ensure there is enough space at the bottom for the digital signature, label, and date
        if (yPosition <= 100) {
            page = pdfDoc.addPage();
            yPosition = height - margin;
        }

        // Add digital signature at the end of the page
        yPosition -= 40; // Adjust position for spacing

        page.drawImage(digitalSignatureImage, {
            x: margin,
            y: yPosition,
            width: digitalSignatureDims.width,
            height: digitalSignatureDims.height,
        });

        // Add label "Customer Signature" under the digital signature
        const signatureLabel = 'Customer Signature';
        page.drawText(signatureLabel, {
            x: margin,
            y: yPosition - 15,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // Add the current date under the "Customer Signature" label
        const currentDate = new Date().toLocaleDateString();
        page.drawText(currentDate, {
            x: margin,
            y: yPosition - 30,
            size: 12,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};

module.exports = generatePdfreg;
