import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface Jugador {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://kmapmeosqvmiutqpfyri.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttYXBtZW9zcXZtaXV0cXBmeXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMDE2MTUsImV4cCI6MjA2NzU3NzYxNX0.pNO_bsVeiGtleX1Gst5--38ZYB_DYo-mtsM7m6hz-0U';
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getJugadores(): Promise<Jugador[]> {
    const { data, error } = await this.supabase
      .from('jugadores')
      .select('*');
    
    if (error) {
      console.error('Error fetching jugadores:', error);
      throw error;
    }
    
    return data || [];
  }

  async addJugador(nombre: string): Promise<Jugador> {
    const { data, error } = await this.supabase
      .from('jugadores')
      .insert([{ nombre }])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding jugador:', error);
      throw error;
    }
    
    return data;
  }
} 