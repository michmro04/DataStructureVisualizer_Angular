import { IVisualizableStructure } from "../services/IVisualizableStructure";

export class Node {
    value: number;
    next: Node | null;
    gridIndex: number;
    address: string;

    constructor(element: number, gridIndex: number, address: string){
        this.value = element;
        this.next = null;
        this.gridIndex = gridIndex;
        this.address = address;    
    }
}

export class MyLinkedList implements IVisualizableStructure{
    public head: Node | null;

    private readonly maxSlots = 26;
    private readonly baseAddress = 0x1000;
    private readonly addressOffset = 8;

    private occupiedSlots: boolean[];

    constructor(){
        this.head = null;
        this.occupiedSlots = new Array(this.maxSlots).fill(false);
    }

    private allocateMemorySlot(): number {
        let freeSlots: number[] = [];
        for (let index = 0; index < this.maxSlots; index++) {
            if(this.occupiedSlots[index]==false){
                freeSlots.push(index);
            }     
        }

        if(freeSlots.length == 0){
            throw new Error("Out of memory!");
        }

        let randomIndex: number = Math.floor( Math.random() * (freeSlots.length));
        let chosenSlot: number = freeSlots[randomIndex];
        this.occupiedSlots[chosenSlot] = true;

        return chosenSlot; 
    }

    addElement(element: number): void { 
        
        let index: number = this.allocateMemorySlot();
        let hexAddress = '0x' + (this.baseAddress + (index * this.addressOffset)).toString(16).toUpperCase();        const newNode = new Node(element, index, hexAddress);
        
        if (this.head==null){
            this.head = newNode;
        } else{
            let current = this.head;
            while(current.next!==null){
                current = current.next;
            }
            current.next = newNode;
        }
    }

    removeElement(): number {
        if(this.head != null){
            let removedNode: Node | null = this.head;
            this.occupiedSlots[removedNode.gridIndex] = false;
            this.head = this.head.next;
            return removedNode.value;
        }
        else{
            throw new Error("LinkedList is empty");
        }
    }

    removeElementByIndex(targetAddress: string): void {
        if(this.head === null){
            throw new Error("Linked List is empty!");
        }
        else if ( this.head.address == targetAddress ) {
            this.occupiedSlots[this.head.gridIndex] = false;
            this.head = this.head.next;
            return;
        }else{
            let current = this.head;
            while(current.next != null){
                if(current.next.address === targetAddress){
                    let removedNode = current.next;
                    current.next = removedNode.next;
                    this.occupiedSlots[removedNode.gridIndex] = false;
                    return;
                }
                current = current.next;
            }
            throw new Error(`There is no ${targetAddress} address.`)
        }
    }

    getElements(): number[] {
        let elements: number[] = [];
        let current = this.head;
        while(current != null){
            elements.push(current.value);
            current = current.next;
        }
        return elements;
    }

    getNodes(): Node[] {
        let nodes: Node[] = [];
        let current = this.head;
        while(current != null){
            nodes.push(current);
            current = current.next;
        }
        return nodes;
    }

    clear(): void {
        this.head = null;
        this.occupiedSlots.fill(false);
    }
}