import { IVisualizableStructure } from "../services/IVisualizableStructure";

class Node{
    value: number;
    behind: Node | null; 

    constructor(element: number){
        this.value = element;
        this.behind = null;
    }
}

export class MyQueue implements IVisualizableStructure{
    private first : Node | null;
    private last : Node | null;

    constructor(){
        this.first = null;
        this.last = null;
    }

    addElement(element: number): void {
        const newNode = new Node(element);
        newNode.value = element;
        
        if(this.first==null){   //queue is empty and newNode is the first Node
            this.first = newNode;
            this.last = newNode;
        }else{
            this.last!.behind = newNode;
            this.last = newNode;
        }   
    }

    removeElement(): number {
        if(this.first !== null){
            const elementValue = this.first.value;
            this.first = this.first.behind;

            //queue has only one element
            if (this.first === null) {
                this.last = null;
            }

            return elementValue;
        }else{
            throw new Error("Queue is empty!");
        }
    }

    getElements(): number[] {
        const elements: number[] = [];
        let current: Node | null = this.first;

        while(current !== null){
            elements.push(current.value);
            current = current.behind;
        }
        return elements;
    }

    clear(): void {
        this.first = null;
        this.last = null;
    }
}
