import api from './api'
import type { Contact } from '@/types'

export const contactsService = {
  async submitContact(contact: {
    name: string
    email: string
    phone?: string
    message: string
  }): Promise<Contact> {
    const { data } = await api.post<Contact>('/contacts', contact)
    return data
  },

  // Admin methods
  async getContacts(read?: boolean): Promise<Contact[]> {
    const { data } = await api.get<Contact[]>('/contacts', {
      params: { read },
    })
    return data
  },

  async getContact(id: string): Promise<Contact> {
    const { data } = await api.get<Contact>(`/contacts/${id}`)
    return data
  },

  async markAsRead(id: string): Promise<Contact> {
    const { data } = await api.patch<Contact>(`/contacts/${id}/read`)
    return data
  },

  async deleteContact(id: string): Promise<void> {
    await api.delete(`/contacts/${id}`)
  },
}
