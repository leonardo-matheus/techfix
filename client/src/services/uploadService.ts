import api from './api'
import type { UploadResponse } from '@/types'

export const uploadService = {
  async uploadSingle(file: File): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const { data } = await api.post<UploadResponse>('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },

  async uploadMultiple(files: File[]): Promise<UploadResponse[]> {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })

    const { data } = await api.post<UploadResponse[]>(
      '/upload/multiple',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return data
  },
}
