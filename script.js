// =====================================================
// GRÁFICO DE VELAS JAPONESAS
// =====================================================

const candlesContainer =
    document.getElementById("candles");


if (candlesContainer) {

    const candleData = [

        [68, 48, 22, "bull"],
        [62, 42, 27, "bear"],
        [58, 36, 24, "bull"],
        [52, 31, 25, "bull"],
        [55, 34, 22, "bear"],
        [47, 26, 27, "bull"],
        [50, 29, 23, "bear"],
        [43, 22, 27, "bull"],
        [46, 25, 23, "bull"],
        [39, 18, 27, "bull"],
        [43, 22, 23, "bear"],
        [35, 15, 25, "bull"],
        [39, 19, 24, "bear"],
        [31, 11, 25, "bull"],
        [35, 15, 22, "bull"],
        [28, 9, 23, "bull"],
        [31, 12, 20, "bear"],
        [25, 7, 22, "bull"],
        [28, 10, 20, "bull"],
        [22, 5, 21, "bull"],
        [25, 8, 19, "bear"],
        [19, 3, 21, "bull"],
        [22, 6, 18, "bull"],
        [17, 2, 20, "bull"],
        [20, 5, 17, "bear"],
        [14, 1, 19, "bull"]

    ];


    candleData.forEach(
        function(data, index) {

            const candle =
                document.createElement("div");

            candle.className =
                "candle " + data[3];


            candle.style.setProperty(
                "--wick-top",
                data[1] + "%"
            );


            candle.style.setProperty(
                "--wick-height",
                data[2] + "%"
            );


            candle.style.setProperty(
                "--body-top",
                data[0] + "%"
            );


            candle.style.setProperty(
                "--body-height",
                "9%"
            );


            candle.style.animationDelay =
                (index * 0.055) + "s";


            const body =
                document.createElement("div");

            body.className =
                "candle-body";


            candle.appendChild(body);


            candlesContainer.appendChild(candle);

        }
    );

}



// =====================================================
// FAQ
// =====================================================

function toggleFaq(button) {

    const item =
        button.parentElement;

    const allItems =
        document.querySelectorAll(".faq-item");


    allItems.forEach(
        function(otherItem) {

            if (otherItem !== item) {

                otherItem.classList.remove(
                    "active"
                );

            }

        }
    );


    item.classList.toggle("active");

}



// =====================================================
// SCROLL SUAVE
// =====================================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(
        function(link) {

            link.addEventListener(
                "click",
                function(event) {

                    const target =
                        document.querySelector(
                            this.getAttribute("href")
                        );


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        }
    );



// =====================================================
// ANIMACIÓN DE MEMBRESÍAS
// =====================================================

const plans =
    document.querySelectorAll(".plan");


const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(
                function(entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


plans.forEach(
    function(plan) {

        plan.style.opacity = "0";

        plan.style.transform =
            "translateY(25px)";

        plan.style.transition =
            "opacity .6s ease, transform .6s ease";

        observer.observe(plan);

    }
);