import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, inject, OnInit, ViewChild, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { AlertService } from '@ledger-portal/shared/ui/alert';
import { FormFocusFirstInvalidControlDirective } from '@ledger-portal/shared/ui/form';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { ErrorMessageComponent } from '@ledger-portal/shared/ui/input-validation-message';
import { LogoComponent } from '@ledger-portal/shared/ui/logo';
import { OverlaySpinnerDirective } from '@ledger-portal/shared/ui/spinner';
import { ReplaceNonEnglishDigitsDirective } from '@ledger-portal/shared/util/localize';

type View = 'login' | 'securityAnswer';

@Component({
  selector: 'ledger-portal-login',
  imports: [
    CommonModule,
    ErrorMessageComponent,
    FormFocusFirstInvalidControlDirective,
    FormsModule,
    LogoComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    SvgIconTypeDirective,
    OverlaySpinnerDirective,
    ReplaceNonEnglishDigitsDirective,
  ],
  templateUrl: './ledger-portal-login.component.html',
})
export class LedgerPortalLoginComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private document = inject(DOCUMENT);
  private alert = inject(AlertService);

  readonly MAX_SECURITY_ANSWER_LENGTH = 5;

  @ViewChild('usernameInput') usernameInput?: ElementRef<HTMLInputElement>;
  @ViewChild('oneTimeOtpInput') oneTimeOtpInput?: ElementRef<HTMLInputElement>;

  showPassword = false;
  loginForm: FormGroup;
  securityAnswerForm: FormGroup;

  view: View = 'login';
  loading$ = signal(false);
  twoFactorData$ = signal<any>(null);
  additionalValidationCases: Record<string, string> = {};

  constructor() {
    this.loginForm = this.formBuilder.nonNullable.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required]],
    });

    this.securityAnswerForm = this.formBuilder.group({
      answer: ['', [Validators.required]],
    });
  }

  get invalidUserNameAndPassword() {
    if (this.loginForm.hasError('invalidUserNamePass')) {
      return 'نام کاربری یا رمز عبور اشتباه است.';
    }
    return;
  }

  ngOnInit(): void {
    this.initializeAuth();
  }

  ngAfterViewInit() {
    this.document.defaultView?.setTimeout(() => {
      this.usernameInput?.nativeElement.focus();
    });
  }

  initializeAuth() {
    this.loginForm.reset();
    this.securityAnswerForm.reset();
  }

  login() {
    if (
      this.loginForm.getRawValue().username !== 'userTest' ||
      this.loginForm.getRawValue().password !== 'test123456'
    ) {
      this.loginForm.setErrors({ invalidUserNamePass: true });
      return;
    }
    this.router.navigate(['/console']);
  }

  completeLogin() {
    if (this.securityAnswerForm.invalid) {
      return;
    }
    this.router.navigate(['/console']);
  }
}
