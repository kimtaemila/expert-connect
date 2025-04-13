
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      experts: {
        Row: {
          id: string
          created_at: string
          name: string
          title: string
          industries: string[]
          skills: string[]
          connection_strength: number
          insights: string[]
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          title: string
          industries: string[]
          skills: string[]
          connection_strength: number
          insights: string[]
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          title?: string
          industries?: string[]
          skills?: string[]
          connection_strength?: number
          insights?: string[]
          image_url?: string | null
        }
      }
      topics: {
        Row: {
          id: string
          created_at: string
          name: string
          type: 'industry' | 'skill' | 'expertise'
          count: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          type: 'industry' | 'skill' | 'expertise'
          count: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          type?: 'industry' | 'skill' | 'expertise'
          count?: number
        }
      }
      connections: {
        Row: {
          id: string
          created_at: string
          source_id: string
          target_id: string
          strength: number
        }
        Insert: {
          id?: string
          created_at?: string
          source_id: string
          target_id: string
          strength: number
        }
        Update: {
          id?: string
          created_at?: string
          source_id?: string
          target_id?: string
          strength?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}
