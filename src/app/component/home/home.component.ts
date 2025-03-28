import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  mission = [
    {
      image: 'assets/img/back2.png',
      text: ' Building youths who are capable of producing exemplary spiritual and secular leadership in the church and the society, today and tomorrow.'
    },
    {
      image: 'assets/img/back.png',
      text: ' Inspiring youths to pursue lives of purpose, integrating spiritual values with societal contributions that benefit both church and community.'
    },
    {
      image: 'assets/img/back1.png',
      text: 'Cultivating youths who embody integrity and purpose, prepared to lead with wisdom and serve as pillars of faith and progress in church and community.'
    }
  ]
}
