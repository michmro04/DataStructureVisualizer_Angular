import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MyLinkedList, Node } from '../../structures/MyLinkedList';

@Component({
  selector: 'app-linked-list',
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
  templateUrl: './linkedList.html',
  styleUrl: './linkedList.scss',
})
export class LinkedListComponent {
  private linkedList = new MyLinkedList();
  
  visualNodes: Node[] = [];
  inputElement: number | null = null;

  memorySlots: number[] = Array.from({length: 24}, (_, i) => i);

  onAdd(){
    if(this.visualNodes.length == 24){
      alert("Memory is full");
      return;
    }

    if(this.inputElement !== null){
      this.linkedList.addElement(this.inputElement);
      this.updateView();
      this.inputElement=null;
    }
  }

  onRemove(){
    try{
      this.linkedList.removeElement();
      this.updateView();
    }catch(error: any){
      alert(error.message);
    }
  }

  onRemoveByIndex(index: string){
    try{
      this.linkedList.removeElementByIndex(index);
      this.updateView();
    }catch(error: any){
      alert(error.message);
    }
  }

  onClear(){
    this.linkedList.clear();
    this.updateView();
  }

  private updateView(){
    this.visualNodes = this.linkedList.getNodes();
  }

  getNodeAtSlot(index: number): Node | undefined{
    return this.visualNodes.find(node => node.gridIndex === index);
  }
}
