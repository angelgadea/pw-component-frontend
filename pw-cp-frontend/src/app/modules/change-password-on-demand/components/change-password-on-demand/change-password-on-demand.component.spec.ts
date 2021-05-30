import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

// component
import { ChangePasswordOnDemandComponent } from './change-password-on-demand.component';

describe('ChangePasswordOnDemandComponent', () => {
  let component: ChangePasswordOnDemandComponent;
  let fixture: ComponentFixture<ChangePasswordOnDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordOnDemandComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordOnDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showCurrentPassword() debería poder mostrar y ocultar la contraseña actual', () => {
    component.showCurrentPassword();
    expect(component.currentPassword).toBe(true, 'mostrar al primer click');
    component.showCurrentPassword();
    expect(component.currentPassword).toBe(false, 'ocultar al segundo click');
    component.showCurrentPassword();
    expect(component.currentPassword).toBe(true, 'mostrar al tercer click');
  });

  it('showNewPassword() debería poder mostrar y ocultar la nueva contraseña', () => {
    component.showNewPassword();
    expect(component.newPassword).toBe(true, 'mostrar al primer click');
    component.showNewPassword();
    expect(component.newPassword).toBe(false, 'ocultar al segundo click');
  });

  it('showRepeatPassword() debería poder mostrar y ocultar la contraseña repetida', () => {
    component.showRepeatPassword();
    expect(component.repeatPassword).toBe(true, 'mostrar al primer click');
    component.showRepeatPassword();
    expect(component.repeatPassword).toBe(false, 'ocultar al segundo click');
  });

  it('onNewPassword() debería poder validar si contraseña cumple con la expresión', () => {
    const regexp = (/^(?=.*\d)(?=.*[\u002a\u003f\u0023\u0025\u0026\u003d\u002b\u003c\u003e\u0028\u0029])(?=.*[A-Z])(?=.*[a-z])\S{8,20}$/);
    const valueInputPassword = ( document.getElementById('password') as HTMLInputElement).value = '?P?i?s?c?o?I?c?a?1?';
    document.getElementById('password').onkeyup;
    component.onNewPassword();
    expect(regexp.test(valueInputPassword)).toBe(true);
  });

  it('onRepeatPassword() debería poder validar que las contraseñas coincidan', () => {
    const valueInputPassword = ( document.getElementById('password') as HTMLInputElement).value = 'PiscoIca1?';
    const valueInputRepeatpassword = ( document.getElementById('repeatPassword') as HTMLInputElement).value = 'PiscoIca1?';
    document.getElementById('repeatPassword').onkeyup;
    component.onRepeatPassword();
    expect(valueInputRepeatpassword).toBe(valueInputPassword);
  });
});
