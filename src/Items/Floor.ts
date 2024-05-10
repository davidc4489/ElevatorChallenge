import Building from "./Building";

export default class Floor {
    private floorNumber: number;
    public isWaiting: boolean;
    public timeToWait: number;
    private timer: number | null;
    private buildingIndex: number;

    constructor(floorNumber: number, buildingIndex: number) {
        this.floorNumber = floorNumber;
        this.isWaiting = false;
        this.timeToWait = 0;
        this.timer = null;
        this.buildingIndex = buildingIndex;
    }

    public render(): string {

        // Display the button in green if the floor is waiting 
        const buttonClass = this.isWaiting ? 'metal linear floor-button green' : 'metal linear floor-button';
        // Show wait time if floor is waiting
        const timeToDisplay = this.timeToWait > 0 ? `<span class="time-to-wait">${this.timeToWait}</span>` : '';

        // The button contains information about its building and its floor
        return `
        <div class="blackline"></div>
        <div class="floor">
            <div class="floor-content">
                <button class="${buttonClass}" style="border: none;" floorNumberData="${this.floorNumber}" buildingIndexData="${this.buildingIndex}" >
                    ${this.floorNumber}
                </button>
                <div class="time-to-wait">
                    ${timeToDisplay}
                </div>
            </div>
        </div>`;
    }

    public updateRender(): void {
        // Keep the calling floor
        const element = document.querySelector(`.floor-button[floorNumberData="${this.floorNumber}"][buildingIndexData="${this.buildingIndex}"]`) as HTMLElement | null;
        
        if (element) {
            // Display the button in green if the floor is waiting 
            const buttonClass = this.isWaiting ? 'metal linear floor-button green' : 'metal linear floor-button';
            element.className = buttonClass;
            // Show wait time if floor is waiting
            const timeDisplay = this.timeToWait > 0 ? `<span class="time-to-wait" >${this.timeToWait}</span>` : '';
            element.innerHTML = `${this.floorNumber} ${timeDisplay}`;
        }
    }

    // Function called when an elevator is assigned to the floor and which counts down the waiting time until the elevator arrives
    public setTime(secondsToWait: number) : void {
        this.timeToWait = secondsToWait;
        if (this.timer) {
            clearInterval(this.timer); // Stop the preview timer
        }
        if (this.timeToWait > 0) {
            this.timer = setInterval(() => {
                if (this.timeToWait >= 0.5) {
                    this.timeToWait -= 0.5;
                    this.updateRender();
                }
                if (this.timeToWait <= 0) {
                    clearInterval(this.timer!);
                    this.timer = null;
                }
            }, 500);
        }
        this.updateRender();
    }

}