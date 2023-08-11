import { Component } from '@angular/core';
import { QrCodeService } from '../services/qr-code.service';
import { FormBuilder, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { MensageriaService } from '../services/mensageria-service';

const VALIDATION_ERROR_STATUS = 400;


export function validadorSemEspacosEmBranco(control: FormControlDirective) {
  const possuiApenasEspacos = (control.value || '').trim().length === 0;
  const isValid = !possuiApenasEspacos;
  return isValid ? null : { 'espacosEmBranco': true };
}


@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.scss']
})
export class QrCodeGeneratorComponent {
  qrCodeForm: FormGroup = new FormGroup({});
  qrCodeImage: string | null = null;
  qrCodeBase64: string | null = null;

  constructor(
    private mensageriaService: MensageriaService,
    private qrCodeService: QrCodeService,
    private fb: FormBuilder
  ) {
    this.iniciarFormulario();
  }

  private iniciarFormulario(): void {
    this.qrCodeForm = this.fb.group({
      texto: ['', [Validators.required, validadorSemEspacosEmBranco]],
        scale: [200, Validators.required],
        foregroundColor: ['#000000', Validators.required],
        backgroundColor: ['#FFFFFF', Validators.required],
        isDownloadChecked: [false],
        isBase64Checked: [false]
    });
  }

  geradorQrCode(): void {
    const formValue = this.qrCodeForm.value;
    const params = {
      texto: formValue.texto,
      scale: formValue.scale,
      foreground: formValue.foregroundColor,
      background: formValue.backgroundColor,
      download: formValue.isDownloadChecked ? 'true' : 'false',
      base64: formValue.isBase64Checked ? 'true' : 'false'
    };

    this.qrCodeService.geradorQrCode(params).subscribe(data => {
      this.handleServiceResponse(data, formValue.isBase64Checked);
    }, error => {
      this.handleError(error);
    });
  }

  private handleServiceResponse(data: any, isBase64Checked: boolean): void {
    if (isBase64Checked) {
      this.qrCodeBase64 = data;
      this.qrCodeImage = null;
      this.mensageriaService.showMensagemSucesso('Base64 gerado com sucesso!');
    } else {
      this.readAsDataURL(data);
      this.mensageriaService.showMensagemSucesso('QR Code gerado com sucesso!');
    }
  }

  private readAsDataURL(data: Blob): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.qrCodeImage = e.target.result;
    };
    reader.readAsDataURL(data);
    this.qrCodeBase64 = null;
  }

  private handleError(error: any): void {
    if (error.status === VALIDATION_ERROR_STATUS) {
      this.mensageriaService.showMensagemErro('Texto ou Escala são obrigatórios');
    } else {
      this.mensageriaService.showMensagemErro('Ocorreu um erro inesperado!');
    }
  }
  
  
  copyToClipboard(textArea: HTMLTextAreaElement) {
    textArea.select(); // Seleciona o conteúdo do textarea
    document.execCommand('copy'); // Copia o conteúdo selecionado
    textArea.setSelectionRange(0, 0); // Desseleciona o conteúdo do textarea
    this.mensageriaService.showMensagemInformativa('Texto copiado para a área de transferência!');
  }

  downloadQrCode(): void {
    if (this.qrCodeImage) {
      const link = document.createElement('a');
      link.href = this.qrCodeImage;
      link.download = 'qr-code.png';
      link.click();
    }
  }

  onDownloadCheckboxClick() {
      this.toggleExclusiveCheckboxes('isDownloadChecked', 'isBase64Checked');
  }

  onBase64CheckboxClick() {
      this.toggleExclusiveCheckboxes('isBase64Checked', 'isDownloadChecked');
  }

  toggleExclusiveCheckboxes(checkedControlName: string, uncheckedControlName: string) {
    if (this.qrCodeForm.get(checkedControlName)?.value) {
        this.qrCodeForm.get(uncheckedControlName)?.setValue(false);
    }
  }

  hasErros(controlName: string, errorName: string): any {
    return this.qrCodeForm.controls[controlName].hasError(errorName);
  }
  
  
}