class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <style>
      #formContainer{
        margin:auto;
        width: 300px;
        padding-bottom:20px;
        justify-content:center;
        text-align:center;
      }
      #submitButton{
        padding:10px;
        border: 1px solid gray;
        border-radius: 10px;
        background:black;
        color: #FFD700;
      }
      #commentsHeader{
        margin:10px 0;
      }
      </style>
      <div id="formContainer">
        <h4 id="commentsHeader">ADD A COMMENT</h4>
        <p class="marginlessP">Name</p>
        <input id="nameinput" type="text" name="name"/>
        <p class="marginlessP">Comment</p>
        <textarea type="text" id="commentinput" name="comment"></textarea>
        <p></p>
        <button id="submitButton" type="submit">Submit</button>
      </div>
    `;
    document.getElementById("submitButton").addEventListener('click', this.submitComment); 
  }
  submitComment(){
    event.preventDefault();
    let name = document.getElementById("nameinput").value;
    let comment = document.getElementById("commentinput").value;
    if(!name || !comment) return
    else{

    }
  }
}

customElements.define('comment-component', Header);