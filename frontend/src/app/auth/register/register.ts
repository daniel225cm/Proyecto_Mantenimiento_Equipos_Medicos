import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  name = '';
  email = '';
  password = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  register() {

    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({

      next: (res) => {

        console.log('REGISTRO EXITOSO:', res);

        alert('Usuario registrado correctamente.');

        this.router.navigate(['/']);

      },

      error: (err) => {

        console.error('ERROR COMPLETO:', err);
        console.error('STATUS:', err.status);
        console.error('MENSAJE:', err.message);
        console.error('RESPUESTA:', err.error);

        alert(
          'Status: ' + err.status +
          '\n\n' +
          JSON.stringify(err.error)
        );

      }

    });

  }

}
