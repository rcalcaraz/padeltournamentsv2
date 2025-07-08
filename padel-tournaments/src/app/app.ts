import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService, Jugador } from './services/supabase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'Padel Tournaments';
  protected jugadores: Jugador[] = [];
  protected nuevoJugador = '';
  protected loading = false;
  protected error = '';

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.cargarJugadores();
  }

  async cargarJugadores() {
    try {
      this.loading = true;
      this.jugadores = await this.supabaseService.getJugadores();
    } catch (error) {
      this.error = 'Error al cargar jugadores';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  async agregarJugador() {
    if (!this.nuevoJugador.trim()) return;
    
    try {
      this.loading = true;
      await this.supabaseService.addJugador(this.nuevoJugador);
      this.nuevoJugador = '';
      await this.cargarJugadores();
    } catch (error) {
      this.error = 'Error al agregar jugador';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
