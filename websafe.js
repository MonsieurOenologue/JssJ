var count = 0;
for (r = 0; r < 16; r += 3) {
            count++;
            $("#colors").append("<div id='color" + count + "'></div>");
            for (g = 0; g < 16; g += 3) {
                for (b = 0; b < 16; b += 3) {
                    $("#color" + count).append("<div class='aColor' style='background-color: #" + r.toString(16) + g.toString(16) + b.toString(16) + "'/></div>");
                }

            }
        }
