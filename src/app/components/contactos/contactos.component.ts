import { Component, OnInit } from '@angular/core';
import { Contacto } from '../../models/contacto';
import { ContactosService } from '../../services/contactos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})
export class ContactosComponent implements OnInit {
  Titulo = 'Contactos';

  AccionesABMC = {
    A: '(Agregar)',
    C: '(Consultar)',
    L: '(Listado)',
  };

  AccionABMC = this.AccionesABMC.L;

  Submitted: boolean = false;

  Items: Contacto[] = null;

  constructor( 
    private contactosService: ContactosService,
    private modalDialogService: ModalDialogService
  ) {}

  FormRegistro = new FormGroup({
    IdContacto: new FormControl(0),
    Nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    FechaNacimiento: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
      ),
    ]),
    Telefono: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{1,9}'),
    ]),
  });

  ngOnInit() {
    this.Buscar();
  }

  Buscar() {
    this.contactosService.get().subscribe((res: any) => {
      this.Items = res;
    });
  }

  Agregar() {
    this.AccionABMC = this.AccionesABMC.A;
    this.FormRegistro.reset({ IdContacto: 0 });
    this.Submitted = false;
  }

  Volver() {
    this.AccionABMC = this.AccionesABMC.L;
  }

  Consultar(Item) {
    window.scroll(0, 0);

    this.contactosService.getById(Item.IdContacto).subscribe((res: any) => {
      this.FormRegistro.patchValue(res);

      var arrFecha = res.FechaNacimiento.substr(0, 10).split('-');
      this.FormRegistro.controls.FechaNacimiento.patchValue(
        arrFecha[2] + '/' + arrFecha[1] + '/' + arrFecha[0]
      );

      this.AccionABMC = this.AccionesABMC.C;
    });
  }

  Grabar() {
    this.Submitted = true;

    if (this.FormRegistro.invalid) {
      return;
    }

    const itemCopy = { ...this.FormRegistro.value };

    var arrFecha = itemCopy.FechaNacimiento.substr(0, 10).split('/');
    if (arrFecha.length == 3)
      itemCopy.FechaNacimiento = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();

    if (this.AccionABMC == this.AccionesABMC.A) {
      this.contactosService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
    }
  }
}
