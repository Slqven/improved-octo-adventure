# 🚀 AWS Deployment Guide

Your production build is ready in the `dist/` folder!

## 📦 Build Output

The build created:
- **index.html** (6.61 KB)
- **CSS bundle** (7.81 KB)
- **JavaScript bundle** (130.16 KB)
- **All 15 images** (optimized and hashed)

Total size: ~2.5 MB (mostly images)

---

## ☁️ AWS S3 + CloudFront Deployment

### Option 1: AWS S3 Static Website Hosting

#### Step 1: Create S3 Bucket

1. Go to [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Click **Create bucket**
3. Enter bucket name (e.g., `my-love-letter-website`)
4. Choose region (closest to your audience)
5. **Uncheck** "Block all public access"
6. Click **Create bucket**

#### Step 2: Enable Static Website Hosting

1. Open your bucket
2. Go to **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. Enable **Static website hosting**
6. Index document: `index.html`
7. Error document: `index.html`
8. Click **Save changes**

#### Step 3: Set Bucket Policy

1. Go to **Permissions** tab
2. Scroll to **Bucket policy**
3. Click **Edit**
4. Paste this policy (replace `YOUR-BUCKET-NAME`):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

5. Click **Save changes**

#### Step 4: Upload Files

1. Go to **Objects** tab
2. Click **Upload**
3. Click **Add files** or **Add folder**
4. Select **all files and folders** from the `dist/` directory
5. Click **Upload**

#### Step 5: Access Your Website

1. Go to **Properties** tab
2. Scroll to **Static website hosting**
3. Copy the **Bucket website endpoint**
4. Example: `http://my-love-letter-website.s3-website-us-east-1.amazonaws.com`

---

### Option 2: AWS Amplify (Easiest)

#### Step 1: Go to AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **Get Started** under "Amplify Hosting"

#### Step 2: Deploy Without Git

1. Choose **Deploy without Git provider**
2. Click **Continue**
3. Enter app name (e.g., `love-letter-website`)
4. Environment name: `production`
5. Click **Save and deploy**

#### Step 3: Upload Build

1. Drag and drop the entire `dist/` folder
2. Or click **Choose files** and select all files from `dist/`
3. Wait for deployment (1-2 minutes)

#### Step 4: Access Your Website

1. Copy the provided URL
2. Example: `https://production.d1234abcd.amplifyapp.com`

---

### Option 3: AWS S3 + CloudFront (Best Performance)

#### Why CloudFront?
- **HTTPS** by default
- **Global CDN** - Fast worldwide
- **Custom domain** support
- **Better security**

#### Step 1: Create S3 Bucket (Same as Option 1)

Follow Steps 1-4 from Option 1 above.

#### Step 2: Create CloudFront Distribution

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click **Create distribution**
3. **Origin domain**: Select your S3 bucket
4. **Origin access**: Origin access control settings (recommended)
5. **Viewer protocol policy**: Redirect HTTP to HTTPS
6. **Default root object**: `index.html`
7. Click **Create distribution**

#### Step 3: Update S3 Bucket Policy

CloudFront will provide a policy to update your S3 bucket. Copy and apply it.

#### Step 4: Wait for Deployment

- CloudFront deployment takes 10-15 minutes
- Status will change from "In Progress" to "Deployed"

#### Step 5: Access Your Website

- Copy the **Distribution domain name**
- Example: `https://d1234abcd.cloudfront.net`

---

## 🌐 Custom Domain (Optional)

### Using Route 53 + CloudFront

1. **Register domain** in Route 53 (or use existing)
2. **Request SSL certificate** in AWS Certificate Manager
3. **Add alternate domain** to CloudFront distribution
4. **Create Route 53 record** pointing to CloudFront

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [x] Build completed successfully (`npm run build`)
- [x] All images are in `dist/` folder
- [x] Test the build locally: `npm run preview`
- [ ] Personalize all text content
- [ ] Replace placeholder text with your words
- [ ] Test on mobile device
- [ ] Proofread everything

---

## 🔧 Build Commands

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview

# Clean and rebuild
rm -rf dist && npm run build
```

---

## 📁 What's in the dist/ Folder?

```
dist/
├── index.html                    # Main HTML file
├── assets/
│   ├── index-[hash].css         # Minified CSS
│   ├── index-[hash].js          # Minified JavaScript
│   └── [image-name]-[hash].jfif # All 15 images (optimized)
```

**Total size:** ~2.5 MB
**Gzipped:** ~50 KB (JS) + 2.3 KB (CSS) + images

---

## 🎯 Deployment Options Comparison

| Method | Difficulty | Cost | HTTPS | CDN | Custom Domain |
|--------|-----------|------|-------|-----|---------------|
| **S3 Only** | Easy | ~$0.50/mo | ❌ | ❌ | ⚠️ |
| **Amplify** | Easiest | ~$1/mo | ✅ | ✅ | ✅ |
| **S3 + CloudFront** | Medium | ~$1/mo | ✅ | ✅ | ✅ |

**Recommendation:** Use **AWS Amplify** for easiest deployment with all features.

---

## 🔒 Security Best Practices

1. **Use HTTPS** - Always (CloudFront or Amplify provides this)
2. **Restrict S3 access** - Only CloudFront should access S3
3. **Enable CloudFront logging** - Monitor access
4. **Use custom domain** - More professional

---

## 💰 Cost Estimate

### AWS S3
- Storage: ~$0.023 per GB/month
- Requests: ~$0.0004 per 1,000 requests
- **Your site:** ~$0.50/month (low traffic)

### AWS CloudFront
- Data transfer: ~$0.085 per GB
- Requests: ~$0.0075 per 10,000 requests
- **Your site:** ~$0.50/month (low traffic)

### AWS Amplify
- Build & deploy: Free tier available
- Hosting: ~$0.15 per GB served
- **Your site:** ~$1/month

**Total estimated cost: $1-2/month for low traffic**

---

## 🐛 Troubleshooting

### Images not loading
- Check image paths in CSS
- Ensure images are in `dist/assets/`
- Check S3 bucket permissions

### Fonts not loading
- Google Fonts should work automatically
- Check CORS settings if issues

### Animations not working
- Check JavaScript console for errors
- Ensure JavaScript is enabled
- Test in different browsers

---

## ✅ Post-Deployment Checklist

After deploying:

- [ ] Visit the live URL
- [ ] Test all scroll animations
- [ ] Check all 15 images load
- [ ] Test on mobile device
- [ ] Test on different browsers
- [ ] Share with your loved one! 💝

---

## 📱 Sharing the Link

Once deployed, you can:

1. **Share the URL directly**
2. **Create a QR code** (use qr-code-generator.com)
3. **Set up a custom domain** for a personal touch

---

## 🎁 Final Tips

- **Test before sharing** - Make sure everything works
- **Choose the right moment** - Timing matters
- **Consider the device** - Desktop or mobile?
- **Add a personal note** - Explain what it is

---

**Your beautiful love letter website is ready to share with the world! 💝**
