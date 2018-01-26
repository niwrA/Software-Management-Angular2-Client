export class NavLink {
    path: string;
    label: string;
    isActive: boolean;
    constructor(path: string, label: string, isActive: boolean) {
        this.path = path;
        this.label = label;
        this.isActive = isActive;
    }
}
