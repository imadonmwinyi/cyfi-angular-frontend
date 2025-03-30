import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  scrollTo(type :any){
    document.getElementById(type)!
    .scrollIntoView({behavior: 'smooth', block : 'start'})
  }

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

  event = [
    {
      image: 'assets/img/prayer_conference.jpg',
      program: 'Dew of Hermon',
      theme: 'Saviour',
      venue:'International Headquarter',
      date: 'Aug 23 - Aug 29, 2025',
      register:'Register For DOH',
      isRegister:true
     },
     {
      image: 'assets/img/prayer_conference.jpg',
      program: 'Prayer Conference',
      theme: 'Theme : The Resurrected Life',
      venue:'Agbonma District',
      date: 'April 11, 2025',
      isRegister:false
    },
    {
      image: 'assets/img/quiz_com.jpg',
      program: 'CYFi Quiz Competition 2025',
      theme: 'National Quiz competition',
      venue:'International Headquarter',
      date: 'April 13, 2025',
      isRegister:false
    },
   
    
  ]
}
