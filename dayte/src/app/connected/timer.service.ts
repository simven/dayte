import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimerService {

    search = false;

    // boolean value allowing to know if the matching found a person
    found = false;

    // timeLeft = 86400; // temps pour trouver une personne après le matching (1 journée)
    timeLeft = 10; // temps pour trouver une personne après le matching (10 secondes pour la soutenance)
    interval;
    display;


    startTimer() {
        this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
            } else {
                this.found = true;
            }
            this.display = this.transform(this.timeLeft);
        }, 1000);
        this.search = true;
    }

    transform(value: number): string {
        const sec_num = value;
        const hours   = Math.floor(sec_num / 3600);
        const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        const seconds = sec_num - (hours * 3600) - (minutes * 60);

        return hours + ':' + minutes + ':' + seconds;
    }

}
