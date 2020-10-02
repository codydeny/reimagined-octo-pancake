function resetEverything(e) {
        localStorage.clear()
        window.location.reload()
    }


    function makestate(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
        document.getElementById("backBtn").addEventListener("click", ()=> {
     	$('#redditPage').hide();
     	$('#frontPage').show();
     });
         document.getElementById("reset").addEventListener("click",resetEverything);

    let state = localStorage.getItem('state');

    if(localStorage.getItem('state')=== null) {
       state = makestate(10); 
       localStorage.setItem('state',state);

    }
      let Client_ID = 'gPiZw9dut5OhHQ'
    let Client_secret = 'Mtfad1S5U79-SPOq3po6X1aP6ZE'
    let code = localStorage.getItem('code')
    let redirect_uri = 'https://freereddittesting.000webhostapp.com/'
    let grant_type = 'authorization_code'
    let access_token;
     setInterval(refresh, 1200000)



	let redditURL = `https://www.reddit.com/api/v1/authorize.compact?client_id=I5i7_z3rTN-JJA&response_type=code&state=${state}&redirect_uri=https://freereddittesting.000webhostapp.com%2F&duration=permanent&scope=identity,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote,wikiedit,wikiread%20account%20creddits%20edit%20read%20submit`;

	 $("#redditVerify").bind( "click", openRedditWindow);
	  $("#redditVerify").bind( "click", handleWait);
	   $("#myProfileReddit").bind( "click", fetchdata);
	   $("#myProfileReddit").bind( "click", ()=> {
	   	 	$('#topPostsRedditDiv').hide();
	   	$('#messagesRedditDiv').hide();
	   	$('#home').show();

	   });
	   $("#topPostsReddit").bind( "click", getTopPosts);
	   $("#topPostsReddit").bind( "click", ()=> {
	   	$('#topPostsRedditDiv').show();
	   	$('#messagesRedditDiv').hide();
	   	$('#home').hide();

	   });
	   $('#messagesReddit').bind('click', getMessages);
	   $('#messagesReddit').bind('click', ()=> {
	   	$('#topPostsRedditDiv').hide();
	   	$('#messagesRedditDiv').show();
	   	$('#home').hide();

	   });
	 if(!(localStorage.getItem('code')=== null)) {
         
       $( "#redditVerified" ).show();
      $("#redditVerify").unbind( "click", openRedditWindow);
     $("#redditVerify").bind( "click", openRedditPage);


       }
        let first = true;
    
    
    async function handleWait(e) {


        setTimeout(async ()=>{ 
    
         await fetch('https://corsanywhereintwiff.herokuapp.com/https://freereddittesting.000webhostapp.com/api/?state='+localStorage.getItem('state'),{
            method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if(data.success) {
                waitTime = false;
    clearInterval(handleWait);
    localStorage.setItem('code',data.code)
    $( "#redditVerified" ).show();
     $("#redditVerify").unbind( "click", openRedditWindow);
     $("#redditVerify").bind( "click", openRedditPage);
 
     


     
    generate()
            }
         /*   var output = `<p>User Name- ${data.displayName} </p><br>
                            <p>User Id- ${data.userId}</p><br>`
            if(data.statusMessage){
                output +=`<p>Status Message- ${data.statusMessage}</p>`
            }
            document.getElementById('output').innerHTML += output
            let imgurl = data.pictureUrl
            if(imgurl){
                let Img = document.createElement('img')
                Img.setAttribute('src',`${imgurl}`)
                Img.classList.add('.show')
                document.querySelector('#output').appendChild(Img)
           
            }*/
            
            })
            
        .catch((err) => console.log("error")) 



        }, 10000);
    
          
       
         
       //fetch friendship status
    
    }

        async function generate(){
            if(first) {
              console.log("One Time Access Token & Refresh Token Requesting")   
           
           let data = {
               'grant_type' : grant_type,
               'code' : localStorage.getItem('code'),
               'redirect_uri' : redirect_uri,

           };

           var config = {
             'method': 'POST',
             'url': 'https://www.reddit.com/api/v1/access_token',
             'headers': {
                //'user-agent': 'web:ReddtiAPITesting:v1.2.3 (by /u/Electrical-Visit7935)',
                //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization' : 'Basic ' + btoa(unescape(encodeURIComponent('I5i7_z3rTN-JJA' + ':' + 'KeCHHs9YIiO1XevaWP5OkZNMx1M')))
              },
             'data' : Qs.stringify(data)
           };

            first = false;
            //refresh access token    
            await axios(config)
            .then((resp) => {
                console.log(resp.data)
                if(resp.data.access_token) {
                      access_token = resp.data.access_token
                 refresh_token = resp.data.refresh_token
                 localStorage.setItem('access_token', resp.data.access_token)
                localStorage.setItem('refresh_token', resp.data.refresh_token)
                console.log("Refresh Tokens & Access Tokens Recieved. You can Fetch Data Now")
                
                }

                 
            })
            .catch((err) => console.log(err))

            //fetch user profile data
            // console.log('User Profile');
          //  let promise = fetchdata(Client_ID,Client_secret,code,redirect_uri,grant_type,access_token)
            }
            else {
                console.log("causing multiple calls");
            }
         
        }

        async function refresh(e) {
            //e.preventDefault()
             let data = {
               'grant_type' : 'refresh_token',
               "refresh_token" : localStorage.getItem('refresh_token')

           };

           let config = {
             'method': 'POST',
             'url': 'https://www.reddit.com/api/v1/access_token',
             'headers': {
                //'user-agent': 'web:ReddtiAPITesting:v1.2.3 (by /u/Electrical-Visit7935)',
                //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization' : 'Basic ' + btoa(unescape(encodeURIComponent('I5i7_z3rTN-JJA' + ':' + 'KeCHHs9YIiO1XevaWP5OkZNMx1M')))
              },
             'data' : Qs.stringify(data)
           };

            first = false;
            //refresh access token    
           axios(config)
            .then((resp) => {
                console.log(resp)
                if(resp.data.access_token) {
                      access_token = resp.data.access_token
                 localStorage.setItem('access_token', resp.data.access_token)
                alert("Token Refreshed");
                }

                 
            })
            .catch((err) => console.log(err))

        }

            async function fetchdata(e){
             e.preventDefault()
        
            await fetch('https://oauth.reddit.com/api/v1/me',{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
            }
        })
        .then((res) => res.json()
        .then((data) => {
            console.log("Requested Data : ");
            console.log(data);
    // $("#redditProfilePic").attr("src",data.icon_img);
      document.getElementById("redditProfilePic").innerHTML =  `<img src=${data.icon_img} class="redditImg" width = "100px" height = "100px"></img>`
       $('#redditName').html(data.name);
          $('#redditKarma').html(data.total_karma + ' karma ');
          $('#redditGold').html(" "+data.gold_creddits + " <img src='rGold.png' class='redditGoldImg' width = '16px' height = '16px'>"); 
            $('#redditDescription').html(data.subreddit.public_description);
             
            }))
            
        .catch((err) => console.log(err))
       //fetch friendship status 
       
        }

                async function getTopPosts(e){
            e.preventDefault()
            await fetch('https://oauth.reddit.com/best',{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Hot posts: ", data.data.children);
            let meme = data.data.children;
                let output;
                let first = true;
                meme.forEach(function(element){
                	if(first) {
                		output += `<div class="carousel-item active">`; 
                		first = false;
                	}
                	else {
                     output += `<div class="carousel-item">`; 
                	}
                	
                	output += `<div class="innerPost text-dark">`;
             var urlType = element.data.url.split(".").splice(-1);
              console.log(urlType);
                  
                   if(element.data.thumbnail_height){
                    	console.log(element.data.thumbnail);
                    output += `<img src=${element.data.thumbnail} width=350 height=300>`
                    }
                     else {
                        output += `<img src="redditBanner.jpg" width=350 height=300>`;
                    }

                    output += ` <div class="carousel-caption d-none d-md-block">
    <p>${element.data.title}</p>
  </div></div> </div>`;
          

                });
      document.getElementById('topPostsRedditDiv').innerHTML = output;

            })
        .catch((err) => console.log(err))
        }



        async function getMessages(e){
            e.preventDefault()
            await fetch('https://oauth.reddit.com/message/inbox',{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Messages: ", data.data.children);
            let meme = data.data.children;
                let output;
                let first = true;
                meme.forEach(function(element){
                	if(first) {
                		output += `<div class="carousel-item active">`; 
                		first = false;
                	}
                	else {
                     output += `<div class="carousel-item">`; 
                	}
                	
                	output += `<div class="innerPost text-dark">`;
                  
                        output += `<img src="white.jpg" width=350 height=300>`;
                   

                    output += ` <div class="carousel-caption" id='meesagesDiv'>
    <div>
                            <h4>${element.data.subject}</h4>
                            <p><b>Sender: ${element.data.author}</b></p>
                            <p>${element.data.body}</p>
                        </div>
  </div></div> </div>`;
          

                });
      document.getElementById('messagesRedditDiv').innerHTML = output;

            })
        .catch((err) => console.log(err))
        }



	function openRedditWindow(bool) {
		
			var windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
     window.open(redditURL,  windowFeatures);
		
		
}

 function openRedditPage() {
            $('#frontPage').hide();
         $('#redditPage').show();
 }