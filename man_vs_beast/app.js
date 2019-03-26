new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        beastHealth: 100,
        gameIsRunning: false,
        specialAttacks: 0,
        maxSpecialAttacks: 2,
        heals: 0,
        maxHeals: 3,
        gameLog: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.beastHealth = 100;
            this.gameLog = [];
            this.specialAttacks = 0;
            this.heals = 0;
        },
        attack: function () {
            this.beastHealth -= this.playerAttack(3,10);
            if (this.weHaveAWinner()) {
                this.gameIsRunning = false;
                return;
            }

            this.playerHealth -= this.beastAttack();
            if (this.weHaveAWinner()) {
                this.gameIsRunning = false;
            }
        },
        specialAttack: function () {
            if (this.specialAttacks == this.maxSpecialAttacks)
            {
                this.gameLog.unshift({
                    isMan: true,
                    message: "You've used all your special attacks :("
                });
                return;
            }
            this.specialAttacks++;
            this.beastHealth -= this.playerAttack(10,20);
            if (this.weHaveAWinner()) {
                this.gameIsRunning = false;
                return;
            }

            this.playerHealth -= this.beastAttack();
            if (this.weHaveAWinner()) {
                this.gameIsRunning = false;
            }
        },
        heal: function () {
            if (this.heals == this.maxHeals)
            {
                this.gameLog.unshift({
                    isMan: true,
                    message: "You've used all your healing power :("
                });
                return;
            }
            this.heals++;
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                this.gameLog.unshift({
                    isMan: true,
                    message: 'Your health has increased by 10%.'
                });
            }
            this.playerHealth -= this.beastAttack();
            if (this.weHaveAWinner()) {
                this.gameIsRunning = false;
            }
        },
        giveUp: function () {
            this.gameIsRunning = false;
            this.gameLog.unshift({
                isMan: true,
                message: "You've forfeited.  The Beast wins :("
            });
        },
        playerAttack: function(min, max) {
            let playerAttackPoints = Math.max(Math.floor(Math.random() * max) + 1, min);
            this.gameLog.unshift({
                isMan: true,
                message: "Your attack caused " + playerAttackPoints + "% damage to the Beast."
            });
            return playerAttackPoints;
        },
        beastAttack: function() {
            let beastAttackPoints = Math.max(Math.floor(Math.random() * 12) + 1, 5);
            this.gameLog.unshift({
                isMan: false,
                message: "The Beast attack caused you " + beastAttackPoints + "% damage."
            });
            return beastAttackPoints;
        },
        weHaveAWinner: function() {
            if (this.beastHealth <= 0) {
                this.gameLog.unshift({
                    isMan: true,
                    message: "You are the winner!!!!"
                });
                return true;
            }
            if (this.playerHealth <= 0) {
                this.gameLog.unshift({
                    isMan: false,
                    message: "You loose :(  The Beast wins...this time."
                });
                return true;
            }
            return false;
        },
        isMan: function(log) {
            return log.isMan;
        },
        isBeast: function(log) {
            return !log.isMan;
        }
    }
});