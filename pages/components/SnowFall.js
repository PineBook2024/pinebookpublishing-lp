import React, { useEffect } from "react";

const SnowFall = () => {
    useEffect(() => {
        const Snowflake = (function () {
            let flakes;
            let flakesTotal = 300; // Increased number of flakes for better coverage
            let wind = 0;
            let mouseX;
            let mouseY;

            function Snowflake(size, x, y, vx, vy) {
                this.size = size;
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.hit = false;
                this.melt = false;
                this.div = document.createElement("div");
                this.div.className = "snowflake";
                this.div.innerHTML = "&#10052;"; // Snowflake symbol ❄
                this.div.style.fontSize = this.size + "px";
                this.div.style.position = "absolute";
                this.div.style.color = "#ffffff"; // White color for snowflakes
                this.div.style.opacity = Math.random() * 0.5 + 0.5; // Add randomness to opacity
            }

            Snowflake.prototype.move = function () {
                if (this.hit) {
                    if (Math.random() > 0.995) this.melt = true;
                } else {
                    this.x += this.vx + Math.min(Math.max(wind, -2), 2); // Reduced wind effect
                    this.y += this.vy;
                }

                if (this.x > window.innerWidth + this.size) {
                    this.x -= window.innerWidth + this.size;
                }

                if (this.x < -this.size) {
                    this.x += window.innerWidth + this.size;
                }

                if (this.y > window.innerHeight + this.size) {
                    this.x = Math.random() * window.innerWidth;
                    this.y -= window.innerHeight + this.size * 2;
                    this.melt = false;
                }

                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                this.hit = !this.melt && this.y < mouseY && dx * dx + dy * dy < 2400;
            };

            Snowflake.prototype.draw = function () {
                this.div.style.transform =
                    this.div.style.MozTransform =
                    this.div.style.webkitTransform =
                    "translate3d(" + this.x + "px," + this.y + "px,0)";
            };

            function update() {
                for (let i = flakes.length; i--;) {
                    const flake = flakes[i];
                    flake.move();
                    flake.draw();
                }
                requestAnimationFrame(update);
            }

            Snowflake.init = function (container) {
                flakes = [];

                for (let i = flakesTotal; i--;) {
                    const size = Math.random() * 8 + 4; // Smaller particles (4px to 12px)
                    const flake = new Snowflake(
                        size,
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight,
                        (Math.random() - 0.5) * 0.3, // Slower horizontal speed
                        size * 0.1 // Reduced vertical speed for smooth animation
                    );
                    container.appendChild(flake.div);
                    flakes.push(flake);
                }

                container.onmousemove = function (event) {
                    mouseX = event.clientX;
                    mouseY = event.clientY;
                    wind = ((mouseX - window.innerWidth / 2) / window.innerWidth) * 2; // Subtle wind effect
                };

                container.ontouchstart = function (event) {
                    mouseX = event.targetTouches[0].clientX;
                    mouseY = event.targetTouches[0].clientY;
                    event.preventDefault();
                };

                window.ondeviceorientation = function (event) {
                    if (event) {
                        wind = event.gamma / 30; // Minimal device orientation effect
                    }
                };

                update();
            };

            return Snowflake;
        })();

        setTimeout(() => {
            Snowflake.init(document.getElementById("snow"));
        }, 500);
    }, []);

    return <div id="snow" className="snow"></div>;
};

export default SnowFall;
