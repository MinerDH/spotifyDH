let list = []
aud = new Audio()
async function songs(folder) {
    let shtml = await fetch(`songs/${folder}`)
    let resp = await shtml.text()
    let div = document.createElement("div")
    div.innerHTML = resp
    let as = Array.from(div.getElementsByTagName("a"))
    arr = []
    as.forEach((e) => {
        if (e.href.endsWith(".mp3")) {
            arr.push(e.href.split(`/songs/${folder}/`)[1])
        }
    }
    )
    return arr
}

async function fil() {
    fol = await fetch("songs/")
    fres = await fol.text()
    ndiv = document.createElement("div")
    ndiv.innerHTML = fres
    Array.from(ndiv.getElementsByTagName("a")).forEach((e) => {
        if (e.href.includes("/songs/")) {
            list.push(e.href.split("/songs/")[1])
        }
    })


    for (const x in list) {
        const car = list[x];
        dataSong = await fetch(`songs/${car}/info.json`)
        songdata = await dataSong.json()
        document.querySelector(".right").innerHTML = document.querySelector(".right").innerHTML + `
    <div class="cardr" data-play="${car}">
    <img  src="${songdata.img}" alt="">
    <p>${songdata.title}</p></div>
`

    }
    Array.from(document.querySelector(".right").children).forEach((e) => {
        e.addEventListener("click", async () => {
            let lis = e.dataset.play
            let rr = await songs(lis)
            document.querySelector(".song-box").innerHTML = ""
            rr.forEach((e) => {
                let name = e.replaceAll("%20", " ")
                document.querySelector(".song-box").innerHTML = document.querySelector(".song-box").innerHTML + `<li class="los" data-al="${lis}" ><img src="music-note-01.svg" alt="" class="imu">${name.replaceAll(".mp3", "")}<img src="play-circle.svg" class="imu" alt=""></li>`
            })

            getname(e.dataset.play)
        })
    })
    // let rr = await songs()
    // rr.forEach((e)=>{
    // let name = e.replaceAll("%20" , " ")
    // document.querySelector(".song-box").innerHTML =  document.querySelector(".song-box").innerHTML+`<li class="los"><img src="music-note-01.svg" alt="" class="imu">${name.replaceAll(".mp3","")}<img src="play-circle.svg" class="imu" alt=""></li>`
    // })
}

function playmus(music, place) {
    document.querySelectorAll(".los").forEach((e) => {
        if (e.textContent == music) {

            e.children[1].src = "pause.svg"
        }
        else {
            e.children[1].src = "play-circle.svg"
        }
    })
    aud.src = "songs/" + place + "/" + music + ".mp3"

    aud.play()
    setTimeout(() => {
        let du = (aud.duration / 60).toString().split(".")
        document.getElementById("dura").innerHTML = du[0] + ":" + du[1][0] + du[1][1]
    }, 1000)
    setInterval(() => {
        try {


            let m = (aud.currentTime / 60).toString().split(".")
            document.getElementById("curr").innerHTML = m[0] + ":" + m[1][0] + m[1][1]


            if (document.getElementById("dura").innerHTML == document.getElementById("curr").innerHTML) {
                Array.from(document.querySelector(".song-box").getElementsByTagName("li")).forEach((e) => {
                    if (aud.src.endsWith(e.innerText.split(" ").slice(-1) + ".mp3")) {
                        setTimeout(() => {
                            let pa = e.dataset.al
                            let sr = e.nextSibling.innerText
                            playmus(sr, pa)
                            e.children[1].src = "play-circle.svg"
                        }, 900)

                    }
                })
            }
        } catch (error) {

        }
    }, 1000)


}
function getname(path) {
    Array.from(document.querySelector(".song-box").getElementsByTagName("li")).forEach((e) => {

        e.addEventListener("click", () => {
            if (e.getElementsByTagName("img")[1].src.endsWith("play-circle.svg")) {
                if (aud.src.endsWith(e.innerText.split(" ").slice(-1) + ".mp3")) {
                    if (aud.src.split(`/songs/${path}`)[1].replaceAll("%20", " ").includes(e.innerText + ".mp3")) {
                        e.children[1].src = "pause.svg"
                        aud.play()
                    }
                }


                else {
                    let song = e.innerText
                    playmus(song, path)
                }
            }
            else {
                e.getElementsByTagName("img")[1].src = "play-circle.svg"
                aud.pause()
            }
        })


    })


}

function dh() {
    setTimeout(() => {
        getname()
        console.log("ON")
    }, 1000)

}

fil()
dh()

setTimeout(()=>{document.getElementById("ham").addEventListener("click", (event) => {
    event.stopPropagation();
    let left = document.getElementsByClassName("left")[0]
    let right = document.getElementsByClassName("right")[0]
    let libx = document.getElementsByClassName("lib")[0]
    left.style.display = "inline"
    libx.style.display = "inline"
    right.style.width = 65+"vw"
    right.style.margin = 0.5+"vh"
    right.style.right = 0
    left.style.height = 12+"vh"
    console.log("dh")
})},3000)
document.body.addEventListener("click", () => {
    console.log("cliced")
})