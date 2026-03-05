import apiClient from '@/utils/axios.js'

/**
 * Upload a CV file to S3
 * @param {File} file - The PDF file to upload
 * @returns {Promise<{url: string, fileName: string, fileSize: number}>}
 */
export const uploadCV = async (file) => {
  if (!file) {
    throw new Error('No file provided')
  }

  // Validate file type
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    throw new Error('Only PDF files are allowed for CV uploads')
  }

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit')
  }

  // Create FormData
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await apiClient.post('/upload/cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return {
      url: response.data.url,
      fileName: response.data.fileName,
      fileSize: response.data.fileSize
    }
  } catch (error) {
    console.error('Error uploading CV:', error)
    throw new Error(error.response?.data?.message || 'Failed to upload CV')
  }
}

/**
 * Upload an image file to S3
 * @param {File} file - The image file to upload
 * @returns {Promise<{url: string, fileName: string, fileSize: number}>}
 */
export const uploadImage = async (file) => {
  if (!file) {
    throw new Error('No file provided')
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))

  if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
    throw new Error('Only image files (JPG, PNG, GIF, WEBP) are allowed')
  }

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit')
  }

  // Create FormData
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await apiClient.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return {
      url: response.data.url,
      fileName: response.data.fileName,
      fileSize: response.data.fileSize
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error(error.response?.data?.message || 'Failed to upload image')
  }
}

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

