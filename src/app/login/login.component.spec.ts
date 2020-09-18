import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';
import { MaterialModule } from '../material.module';
import { UserModel } from '../user.model';

import { LoginComponent } from './login.component';

describe('AppComponent', () => {
  // let fixture: AppComponent;
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiServiceMock: any;
  beforeEach(async(() => {

    apiServiceMock = {
      get: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        HttpClientModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        AppService
      ]
     }).compileComponents();

    TestBed.overrideProvider(AppService, { useValue: apiServiceMock });
    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);
    // get test component from the fixture
    comp = fixture.componentInstance;

    // UserService provided to the TestBed
    // apiServiceMock = TestBed.get(AppService);

  }));

  describe('Setup component', () => {
    describe('ngOnInit', () => {
      it('should call generateUserForm with this.user', () => {
        const generateUserFormSpy = jest.spyOn(comp, 'generateUserForm');
        const user: UserModel = {
          name: 'jimmy'
        } as UserModel;
        comp.user = user;
        comp.ngOnInit();
        expect(generateUserFormSpy).toBeCalledWith(user);
      });
    });
  });


  describe('generateUserForm', () => {
    it('should generate form with passed values', () => {
      const user: UserModel = {
        name: 'jimmy'
      } as UserModel;
      comp.generateUserForm(user);

      expect(comp.detailsForm.value).toEqual(user);
    });

    it('should generate form with default values', () => {
      const expectedResult: UserModel = {
        name: null
      } as UserModel


      comp.generateUserForm(undefined);

      expect(comp.detailsForm.value).toEqual(expectedResult);
    });
    it('value should be false when form is invalid', () => {
      const user: UserModel = {
        name: null
      } as UserModel

      comp.generateUserForm(user);

      expect(comp.detailsForm.valid).toBeFalsy();
    });

    it('value should be true when form is valid', () => {
      const user: UserModel = {
        name: 'jimmy'
      } as UserModel

      comp.generateUserForm(user);

      expect(comp.detailsForm.valid).toBeTruthy();
    });
  });


  describe('Test: Form invalid', () => {
    it('should not call save', () => {
      const formData = {
        name: ''
      };
      comp.generateUserForm(formData);
      const spyloginUser = jest.spyOn(apiServiceMock, 'get');
      comp.save();
      expect(spyloginUser).not.toHaveBeenCalled();
    });
  });

  describe('Test: Form valid', () => {
    it('should call save', () => {
      const formData = {
        name: 'jimmy'
      };
      const spyloginUser = jest.spyOn(apiServiceMock, 'get').mockReturnValue(true);
      expect(apiServiceMock.get(formData)).toBe(true);
      expect(spyloginUser).toHaveBeenCalledWith(formData);
    });
  });

});

