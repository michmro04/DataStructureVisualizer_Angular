import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyStack } from '../../structures/MyStack';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-stack',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
})
export class StackComponent {
  private limitOfStack: number = 10;
  private myStack = new MyStack();

  visualElements: number[] = []
  inputElement: number | null = null;

  onPush(){
    if(this.visualElements.length >= this.limitOfStack){
      alert("Stack is full!")
      return;
    }

    if(this.inputElement !== null){
      this.myStack.addElement(this.inputElement);
      this.updateView();
      this.inputElement = null; //clearing the input window
    }
  }

  onPop(){
    try{
      this.myStack.removeElement();
      this.updateView();
    }catch(error: any){
      alert(error.message);
    }
  }

  onClear(){
    this.myStack.clear();
    this.updateView();
  }

  private updateView(){
    this.visualElements = this.myStack.getElements().reverse();
  }
}
