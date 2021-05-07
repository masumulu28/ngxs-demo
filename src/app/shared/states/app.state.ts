import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

export interface AppStateModel {
    error: any;
}

const defaults: AppStateModel = {
    error: null
};

@State<AppStateModel>({
    name: 'app',
    defaults //Names are matching with local variable, so we don't need to use like 'defaults:defaults'
})
@Injectable()
export class AppState {

}
