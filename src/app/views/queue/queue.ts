import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyQueue } from '../../structures/MyQueue';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-queue',
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './queue.html',
  styleUrl: './queue.scss',
})
export class QueueComponent {
  private limitOfQueue: number = 10;
  private myQueue = new MyQueue();

  visualElements: number[] = [];
  inputElement: number | null = null;

  onEnqueue(){
    if(this.visualElements.length >= this.limitOfQueue){
      alert("Queue is full!");
      return
    }

    if(this.inputElement !== null){
      this.myQueue.addElement(this.inputElement);
      this.updateView();
      this.inputElement = null;
    }
  }

  onDequeue(){
    try{
      this.myQueue.removeElement()
      this.updateView();
    }catch(error: any){
      alert(error.message);
    }
  }

  onClear(){
    this.myQueue.clear();
    this.updateView();
  }

  private updateView(){
    this.visualElements = this.myQueue.getElements();
  }
}
