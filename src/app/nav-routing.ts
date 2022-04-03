import { Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';

export interface NavRoute extends Route {
    path?: string;
    icon?: string;
    group?: string;
    groupedNavRoutes?: NavRoute[];
}

export const sideNavPath = 'nav';

export const navRoutes: NavRoute[] = [
    {
        data: { title: 'Dashboard' },
        icon: 'dashboard',
        path: 'home',
        loadChildren: () =>
            import('./pages/home-page/home-page.module').then(
                m => m.HomePageModule,
            ),
    },
    {
        data: { title: 'Profile' },
        icon: 'user',
        path: 'home',
        loadChildren: () =>
            import('./pages/home-page/home-page.module').then(
                m => m.HomePageModule,
            ),
    },
    {
        data: { title: 'Association' },
        icon: 'clipboard',
        path: 'home',
        loadChildren: () =>
            import('./pages/home-page/home-page.module').then(
                m => m.HomePageModule,
            ),
    },
    {
        data: { title: 'Messages' },
        icon: 'message-circle',
        path: 'home',
        loadChildren: () =>
            import('./pages/home-page/home-page.module').then(
                m => m.HomePageModule,
            ),
    },
    {
        data: { title: 'Posts' },
        icon: 'posts',
        path: 'home',
        loadChildren: () =>
            import('./pages/home-page/home-page.module').then(
                m => m.HomePageModule,
            ),
    },
];

@Injectable({
    providedIn: 'root',
})
export class NavRouteService {
    navRoute: Route;
    navRoutes: NavRoute[];

    constructor(router: Router) {
        this.navRoute = router.config.find(route => route.path === sideNavPath);
        this.navRoutes = this.navRoute.children
            .filter(route => route.data && route.data.title)
            .reduce((groupedList: NavRoute[], route: NavRoute) => {
                if (route.group) {
                    const group: NavRoute = groupedList.find(navRoute => {
                        return (
                            navRoute.group === route.group &&
                            navRoute.groupedNavRoutes !== undefined
                        );
                    });
                    if (group) {
                        group.groupedNavRoutes.push(route);
                    } else {
                        groupedList.push({
                            group: route.group,
                            groupedNavRoutes: [route],
                        });
                    }
                } else {
                    groupedList.push(route);
                }
                return groupedList;
            }, []);
    }

    public getNavRoutes(): NavRoute[] {
        return this.navRoutes;
    }
}
