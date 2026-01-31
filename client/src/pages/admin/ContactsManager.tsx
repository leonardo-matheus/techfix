import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Mail, MailOpen, Trash2, Phone, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { contactsService } from '@/services/contactsService'
import { formatDateTime } from '@/lib/utils'
import type { Contact } from '@/types'

export default function ContactsManager() {
  const { toast } = useToast()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const fetchContacts = useCallback(async () => {
    setIsLoading(true)
    try {
      const readParam =
        filter === 'unread' ? false : filter === 'read' ? true : undefined
      const data = await contactsService.getContacts(readParam)
      setContacts(data)
    } catch {
      toast({ title: 'Erro ao carregar contatos', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }, [filter, toast])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const handleMarkAsRead = async (contact: Contact) => {
    try {
      await contactsService.markAsRead(contact.id)
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, read: true } : c))
      )
      if (selectedContact?.id === contact.id) {
        setSelectedContact({ ...contact, read: true })
      }
    } catch {
      toast({ title: 'Erro ao marcar como lido', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este contato?')) return
    try {
      await contactsService.deleteContact(id)
      setContacts((prev) => prev.filter((c) => c.id !== id))
      if (selectedContact?.id === id) {
        setSelectedContact(null)
      }
      toast({ title: 'Contato excluído', variant: 'success' })
    } catch {
      toast({ title: 'Erro ao excluir', variant: 'destructive' })
    }
  }

  const openContact = async (contact: Contact) => {
    setSelectedContact(contact)
    if (!contact.read) {
      await handleMarkAsRead(contact)
    }
  }

  const unreadCount = contacts.filter((c) => !c.read).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contatos</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} não lidos` : 'Todos lidos'}
          </p>
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="unread">Não lidos</TabsTrigger>
            <TabsTrigger value="read">Lidos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <Card className="py-12">
          <CardContent className="text-center">
            <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhum contato encontrado</p>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {contacts.map((contact) => (
            <motion.div
              key={contact.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  !contact.read ? 'border-primary/50 bg-primary/5' : ''
                }`}
                onClick={() => openContact(contact)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          contact.read
                            ? 'bg-muted'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {contact.read ? (
                          <MailOpen className="h-5 w-5" />
                        ) : (
                          <Mail className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-medium truncate ${
                              !contact.read ? 'font-semibold' : ''
                            }`}
                          >
                            {contact.name}
                          </h3>
                          {!contact.read && (
                            <Badge variant="default" className="text-xs">
                              Novo
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.email}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                          {contact.message}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(contact.createdAt)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mt-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(contact.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Contact Detail Dialog */}
      <Dialog
        open={!!selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
      >
        <DialogContent className="max-w-2xl">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedContact.name}</DialogTitle>
                <DialogDescription>
                  Mensagem recebida em {formatDateTime(selectedContact.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-primary hover:underline"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-primary hover:underline"
                      >
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDateTime(selectedContact.createdAt)}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Mensagem:</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      (window.location.href = `mailto:${selectedContact.email}`)
                    }
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Responder por Email
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedContact.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
