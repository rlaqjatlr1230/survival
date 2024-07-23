const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('background', 'assets/background.png');
}

function create() {    // 배경 이미지를 화면 전체에 맞게 스케일링
    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0); // 이미지의 기준점을 (0,0)으로 설정
    this.background.setDisplaySize(config.width, config.height); // 화면 크기에 맞게 조정

    // 나머지 게임 오브젝트들
    this.add.image(400, 300, 'background');
    
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemies = this.physics.add.group();
    this.time.addEvent({
        delay: 1000,
        callback: this.spawnEnemy,
        callbackScope: this,
        loop: true
    });

    this.physics.add.overlap(this.player, this.enemies, this.handleCollision, null, this);
}

function update() {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
    } else {
        this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
    } else {
        this.player.setVelocityY(0);
    }
}

function spawnEnemy() {
    const x = Phaser.Math.Between(0, 800);
    const y = Phaser.Math.Between(0, 600);
    const enemy = this.enemies.create(x, y, 'enemy');
    enemy.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
}

function handleCollision(player, enemy) {
    enemy.destroy();
}
