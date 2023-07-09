import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { environment } from 'src/environments/environments';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './components/UI/button/button.component';
import { ModalComponent } from './components/UI/modal/modal.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/modals/register-modal/register-modal.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { SpinnerComponent } from './components/UI/spinner/spinner.component';
import { AddProjectComponent } from './components/modals/add-project/add-project.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ConstructiveListComponent } from './components/constructive-list/constructive-list.component';
import { TableInputComponent } from './components/UI/table-input/table-input.component';
import { GraphicListComponent } from './components/graphic-list/graphic-list.component';
import { CellComponent } from './components/UI/cell/cell.component';
import { SelectComponent } from './components/UI/select/select.component';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { AddGraphicModalComponent } from './components/modals/add-graphic-modal/add-graphic-modal.component';
import { AddConstructiveModalComponent } from './components/modals/add-constructive-modal/add-constructive-modal.component';
import { AddMaterialModalComponent } from './components/modals/add-material-modal/add-material-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    ModalComponent,
    LoginModalComponent,
    RegisterModalComponent,
    MainPageComponent,
    ProjectItemComponent,
    SpinnerComponent,
    AddProjectComponent,
    ProjectPageComponent,
    ConstructiveListComponent,
    TableInputComponent,
    GraphicListComponent,
    CellComponent,
    SelectComponent,
    MaterialListComponent,
    AddGraphicModalComponent,
    AddConstructiveModalComponent,
    AddMaterialModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
