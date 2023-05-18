import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa';
import { EmpresasService } from '../../services/empresas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  Titulo = 'Empresas';

  AccionesABMC = {
    A: '(Agregar)',
    L: '(Listado)',
  };

  AccionABMC = this.AccionesABMC.L;

  Submitted: boolean = false;

  Items: Empresa[] = null;

  constructor(
    private empresasService: EmpresasService,
    private modalDialogService: ModalDialogService
  ) {}

  FormRegistro = new FormGroup({
    IdEmpresa: new FormControl(0),
    RazonSocial: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    CantidadEmpleados: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{1,3}'),
    ]),
    FechaFundacion: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
      ),
    ]),
  });

  ngOnInit() {
    this.Buscar();
  }

  Buscar() {
    this.empresasService.get().subscribe((res: any) => {
      this.Items = res;
    });
  }

  Alta() {
    this.AccionABMC = this.AccionesABMC.A;
    this.FormRegistro.reset({ IdEmpresa: 0 });
    this.Submitted = false;
  }

  Cancelar() {
    this.AccionABMC = this.AccionesABMC.L;
  }

  Grabar() {
    this.Submitted = true;

    if (this.FormRegistro.invalid) {
      return;
    }

    const itemCopy = { ...this.FormRegistro.value };

    var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split('/');
    if (arrFecha.length == 3)
      itemCopy.FechaFundacion = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();

    if (this.AccionABMC == this.AccionesABMC.A) {
      this.empresasService.post(itemCopy).subscribe((res: any) => {
        this.Cancelar();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
    }
  }
}
