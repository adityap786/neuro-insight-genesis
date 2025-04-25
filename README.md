NeuroVision

NeuroVision is an AI-powered platform that integrates Augmented Reality (AR), Virtual Reality (VR), Extended Reality (XR), and Mixed Reality (MR) with advanced deep learning models to revolutionize medical imaging diagnostics. Developed as part of the VIT-JHU Health-Hack 2025, NeuroVision focuses on brain tumor segmentation and Visual Question Answering (VQA) to streamline diagnostics, reduce hospital wait times, and enhance accessibility for healthcare professionals. The platform leverages UNet3D, Swin UNETR, and BLIP-2 models, trained on BraTS21 and PathVQA datasets, to deliver precise tumor segmentation and interactive radiology insights.
Table of Contents

Features
Architecture
Installation
Usage
Datasets
Contributing
License
Contact

Features

Brain Tumor Segmentation: Automatically segments brain tumors in MRI/CT scans using UNet3D and Swin UNETR, reducing segmentation time from days to minutes.
Visual Question Answering (VQA): Enables doctors to query medical images (e.g., "What is the abnormality?") with natural-language responses powered by BLIP-2.
Immersive Visualization:
AR: Overlays tumor boundaries on real-world scans for surgical planning.
VR: Provides 3D exploration of tumor models in immersive environments.
MR: Supports real-time interaction with virtual models.
XR: Integrates AR/VR/MR for flexible use cases.


User-Friendly Interface: Web-based platform with a chatbot and drag-and-drop file upload.
Cloud-Based Scalability: Processes images in seconds, accessible globally without costly hardware.
Medical Education: Serves as a training tool for students and professionals.

Architecture
NeuroVision combines AI, cloud computing, and immersive technologies in a modular architecture:

AI Models:
UNet3D: CNN-based model for 3D tumor segmentation, trained on BraTS21.
Swin UNETR: Transformer-based model for enhanced segmentation accuracy.
BLIP-2: Multimodal model for VQA, trained on PathVQA.


Framework: MONAI for medical image preprocessing, model training, and deployment.
Visualization:
AR/VR/MR rendering using Unity/Unreal Engine.
XR compatibility for devices like HoloLens, Oculus Rift, and mobile AR.


Cloud Infrastructure:
Scalable servers for AI inference and visualization.
Content Delivery Network (CDN) for low latency.
Data replication for reliability.


Frontend: React-based UI with a chatbot for user guidance.
Backend: Flask/Django for API management and secure file handling.

Installation
Follow these steps to set up NeuroVision locally or on a cloud server.
Prerequisites

Python: 3.8+
Node.js: 16+ (for frontend)
Docker: For containerized deployment
Hardware: GPU (e.g., NVIDIA RTX 3060) recommended for model training/inference
Cloud: AWS/Azure account for scalable deployment (optional)

Clone the Repository
git clone https://github.com/your-org/neurovision.git
cd neurovision

Backend Setup

Install Dependencies:
pip install -r backend/requirements.txt

Key dependencies: torch, monai, transformers, flask.

Download Pre-trained Models:

UNet3D and Swin UNETR models: Link to weights (or train from scratch using BraTS21).
BLIP-2 model: Use Hugging Face Salesforce/blip2-opt-2.7b.


Set Environment Variables:Create a .env file in backend/:
FLASK_ENV=development
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret


Run the Backend:
cd backend
python app.py

API will be available at http://localhost:5000.


Frontend Setup

Install Dependencies:
cd frontend
npm install

Key dependencies: react, axios, three.js.

Run the Frontend:
npm start

UI will be available at http://localhost:3000.


Docker Deployment

Build and Run:
docker-compose up --build

This sets up backend, frontend, and cloud services in containers.

Access:

Frontend: http://localhost:3000
Backend API: http://localhost:5000



Cloud Deployment

Deploy on AWS EC2 or Azure VM with GPU support.
Use S3 for file storage and CloudFront for CDN.
Refer to deploy/cloud_setup.md for detailed instructions.

Usage

Access the Platform:

Open http://localhost:3000 (local) or your deployed URL.
Log in or create an account.


Upload Medical Images:

Drag and drop DICOM files (MRI/CT) into the interface.
Supported formats: DICOM, NIfTI.


Brain Tumor Segmentation:

Select "Segment Tumor" to process the image.
View 2D/3D results with color-coded tumor regions (e.g., red for tumor core).
Explore in AR/VR/MR using compatible devices.


Visual Question Answering:

Upload an image and ask a question (e.g., “Is this a glioblastoma?”).
Receive a natural-language response with visual annotations.


Generate Reports:

Download detailed reports with tumor metrics and recommendations.
Export to hospital EHR systems.


Example Commands (API):
# Segment an image
curl -X POST -F "file=@scan.dcm" http://localhost:5000/segment

# Ask a VQA question
curl -X POST -F "file=@scan.dcm" -F "question=What is the abnormality?" http://localhost:5000/vqa



Datasets

BraTS21: Multi-modal MRI dataset for brain tumor segmentation.
Source: BraTS Challenge
Modalities: T1, T1ce, T2, FLAIR.
Usage: Training UNet3D and Swin UNETR.


PathVQA: Pathology image dataset with question-answer pairs.
Source: Hugging Face
Usage: Training BLIP-2 for VQA.


Preprocessing: Handled by MONAI (normalization, resampling, augmentation).

Contributing
We welcome contributions to NeuroVision! Follow these steps:

Fork the Repository:
git fork https://github.com/your-org/neurovision.git


Create a Branch:
git checkout -b feature/your-feature


Commit Changes:
git commit -m "Add your feature"


Submit a Pull Request:

Push to your fork and open a PR against the main branch.
Include a detailed description of your changes.


Code Style:

Follow PEP 8 for Python and ESLint for JavaScript.
Use docstrings and comments for clarity.


Issues:

Check Issues for bugs or feature requests.
Submit new issues with clear descriptions and steps to reproduce.



License
This project is licensed under the MIT License. See LICENSE for details.
Contact

Email: neurovision@app.com
GitHub Issues: Report bugs or request features
Slack: Join our community here


NeuroVision is a step toward transforming healthcare with AI and immersive technologies. Join us in making diagnostics faster, more accurate, and accessible to all!


Simply open [Lovable](https://lovable.dev/projects/3e0378f2-03d0-419c-ad84-d917015ae639) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
