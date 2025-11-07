    const firebaseConfig = {
    apiKey: "AIzaSyAkC8tF5VyP9GkisLBY9uYcx0UD505Ucng",
    authDomain: "bsff-b16f6.firebaseapp.com",
    databaseURL: "https://bsff-b16f6-default-rtdb.firebaseio.com",
    projectId: "bsff-b16f6",
    storageBucket: "bsff-b16f6.firebasestorage.app",
    messagingSenderId: "748182732969",
    appId: "1:748182732969:web:9f620bd580d101abc929b8"
    };
    let movieList = [];
    let app, db, moviesCol, doc, getDocs, updateDoc, setDoc, count, movieType;
    async function setUpFns(type, countRef, getDocsRef, docRef, updateDocRef, setDocRef, getMovies = true){
        doc = docRef;
        updateDoc = updateDocRef;
        setDoc = setDocRef;
        getDocs = getDocsRef;
        count = countRef;
        movieType = type;
        if(getMovies) getMoviesAndDisplay();
    }
    async function getMoviesAndDisplay(){
        document.getElementById('loadingScreen').style.display = 'block';
        moviesSnapshot = await getDocs(moviesCol)
        movieList = moviesSnapshot.docs.map(doc => doc.data());
        sessionStorage.setItem("movies", JSON.stringify(movieList));
        setupLikesDisplay();
        document.getElementById('loadingScreen').style.display = 'none';
    }
    function setupLikesDisplay(){
        for(var i=1; i<=count; i++){
            let idx = "id"+movieType+i+"likes";
            let idy = movieType+i;
            var old_element = document.getElementById(idx);
            var new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);
            document.getElementById(idx).innerHTML = (movieList.find(o=>o.id == idy)?.likes || 0) +" likes"    
            document.getElementById(idy).addEventListener('click', ()=>increaseLikes(idy, {type:movieType, id: idy, likes:1}));
        }
    }
    async function increaseLikes(id, data){
        if(event.target.classList.contains('clicked')){
            return
        }
        document.getElementById('loadingScreen').style.display = 'block';
        event.target.style.color= "gray"
        event.target.classList.add('clicked');
        const movie = movieList.find(o=> o.id == id)
        if(movie){
            movie.likes++;
            let movieRef = doc(db, "movies", id);
            await updateDoc(movieRef, movie);
        }
        else{
            const docRef = doc(db, "movies", id);
            await setDoc(docRef, data);
        }
        getMoviesAndDisplay();
        document.getElementById('loadingScreen').style.display = 'none';
    }
    function getComments(){
        let movies = sessionStorage.getItem("movies");
        movies = JSON.parse(movies);
        let currentID = document.getElementsByTagName("comment-component")[0].id.replace('comment','');
        let currMovie= movies.find(o=>o.id==currentID);
        let comments = currMovie.comments;
        if(comments){
            let htmlNode = "";
            for(var i = 0; i< comments.length; i++){
                let comment = comments[i]
                htmlNode += `<div class="commentWrapper"><p class="marginlessP commentWriter">Commented by: ${comment.name}</p><h4 class="marginlessP commentText">${comment.comment}</h4></div>`
            }
            document.getElementById("commentsContainer").innerHTML = htmlNode;
        }
        else{
            let htmlNode = "<p>No comments received yet</p>";
            document.getElementById("commentsContainer").innerHTML = htmlNode;
        }
    }
    async function submitCommentToDatabase(id, movieRef){
        document.getElementById('loadingScreen').style.display = 'block';
        console.log(movieRef);
        let movieDB = doc(db, "movies", id);
        await updateDoc(movieDB, movieRef);
        document.getElementById('loadingScreen').style.display = 'none';
        getComments();
    }