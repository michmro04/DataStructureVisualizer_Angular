export interface IVisualizableStructure{
    addElement(element : number): void;
    removeElement(): number;
    getElements(): number[];
    clear(): void;
}