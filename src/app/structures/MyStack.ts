import { IVisualizableStructure } from "../services/IVisualizableStructure";

class Node {
    value: number;
    below: Node | null
    
    constructor(value: number){
        this.value = value;
        this.below = null;
    }
}


export class MyStack implements IVisualizableStructure{

    private top: Node | null;

    constructor(){
        this.top = null
    }

    addElement(element: number): void {
        const newNode = new Node(element);
        newNode.value = element;
        newNode.below = this.top;
        this.top = newNode;
    }

    removeElement(): number {
        if (this.top != null){
            const elementValue = this.top.value;
            this.top = this.top.below;
            return elementValue;
        }
        else{
            throw new Error("Stack is empty!")
        }
    }

    getElements(): number[] {
        const elements: number[] = [];
        let current: Node | null = this.top;

        while(current !== null){
            elements.push(current.value);
            current = current.below;
        }
        return elements;
    }

    clear(): void {
        this.top = null;
    }

}