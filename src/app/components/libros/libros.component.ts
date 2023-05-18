import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibrosService } from '../../services/libros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {
  Titulo = 'Libros';
  AccionesABMC = {
    L: '(Listado)',
    M: '(Modificar)',
  };
  AccionABMC = this.AccionesABMC.L;
  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...',
  };

  OpcionesActivo = [
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' },
  ];

  Libros: Libro[] = null;

  FormRegistro = new FormGroup({
    Id: new FormControl(0),
    Titulo: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100),
    ]),
    Stock: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
    Activo: new FormControl(true),
  });

  submitted = false;

  constructor(
    private librosService: LibrosService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.Buscar();
  }

  Buscar() {
    this.librosService.get().subscribe((res: any) => {
      this.Libros = res;
    });
  }

  BuscarPorId(Item, AccionABMC) {
    window.scroll(0, 0);
    this.librosService.getById(Item.Id).subscribe((res: any) => {
      this.FormRegistro.patchValue(res);
      this.AccionABMC = AccionABMC;
    });
  }

  Modificar(Item) {
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
    this.BuscarPorId(Item, this.AccionesABMC.M);
  }

  Grabar() {
    this.submitted = true;

    if (this.FormRegistro.invalid) {
      return;
    }

    const itemCopy = { ...this.FormRegistro.value };

    this.librosService.put(itemCopy.Id, itemCopy).subscribe((res: any) => {
      this.Volver();
      this.modalDialogService.Alert('Registro modificado correctamente.');
      this.Buscar();
    });
  }

  Volver() {
    this.AccionABMC = this.AccionesABMC.L;
  }
}
