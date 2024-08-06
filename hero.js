const  loadData = async(id) =>
{
        const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        const data = await res.json()
        const product = data.data;
       
        displayProduct(product);
        
}

const displayProduct = (product) =>
    {
        const mainDiv = document.getElementById('main-div');
        const noData = document.getElementById('opps');
        mainDiv.innerHTML=``;
        noData.innerHTML=``;
        const len = product.length;
        if(len == 0)
            {
                //const noData = document.getElementById('opps');
                noData.innerHTML=``;
                const forNoData = document.createElement('div');
                forNoData.innerHTML=`
                <section class="w-full flex justify-center items-center h-screen"><div class="flex flex-col items-center">
                <img class="text-center" src="images/Icon.png" alt="">
                <h4 class="text-center font-extrabold">Oops!! Sorry,</br> There is no content here.
                </h4>
                </div></section>
                `
        
                noData.appendChild(forNoData);
        
            }
        

        product.forEach((element, index) => {
            
            const hr = element.others.posted_date/3600;
            const hour = hr.toFixed(0);
            const mi = (element.others.posted_date%3600)/60;
            const min = mi.toFixed(0);
            
            const cDiv = document.createElement('div');
            
            
            
            cDiv.classList ='card bg-base-100';
            cDiv.innerHTML =`<div>
         
         <div class="relative">
           <img class="h-[200px] rounded w-[332px]"
             src="${element.thumbnail}"
             alt="Shoes" />
             <div id="posted${index}" class="w-[100px] h-[26px] rounded-md bg-black  absolute right-2 bottom-2"> <p class="text-center align-middle p-1 text-white text-[10px]">${hour} hrs ${min} min ago</p> </div>
             </div>
         
         <div>
            <div class="card-body py-2 grid grid-cols-5 m-0 p-0 justify-start">
                <div >
                <img class="w-[40px] rounded-full h-[40px] " src="${element.authors[0].profile_picture}" alt="profile">
                
                </div>
           
           <div class="col-span-4 ">
            <h4 class="font-extrabold">
                ${element.title}
            </h4>
            <div class="grid grid-cols-2 gap-1 align-middle">
                <p class="font-thin text-xs">
                ${element.authors[0].profile_name} 
                </p>
                 <img class="w-[20px] h-[20px] hidden" id="is-verified${index}" src="images/Unknown.png" alt="">
            </div>
            <p class="font-thin text-xs" >
                ${element.others.views} Views
            </p>
           </div>
              </div>
            </div>
          </div>
         </div>
       `
    
       mainDiv.appendChild(cDiv);
       //toShowOpps(len);
            

       if (element.authors[0].verified==true) {
        const tick = document.getElementById(`is-verified${index}`);
        tick.classList.remove('hidden');
        }
        if(hour==0)
            {
                const postedDate = document.getElementById(`posted${index}`);
                postedDate.classList.add('hidden')
            }
            
});

        
    }

    // For Showing No Data
    const toShowOpps = (len) =>
        {
            if(len == 0)
                {
                    const noData = document.getElementById('opps');
                    noData.innerHTML=``;
                    const forNoData = document.createElement('div');
                    forNoData.innerHTML=`
                    <section class="w-full flex justify-center items-center h-screen"><div class="flex flex-col items-center">
                    <img class="text-center" src="images/Icon.png" alt="">
                    <h4 class="text-center font-extrabold">Oops!! Sorry,</br> There is no content here.
                    </h4>
                    </div></section>
                    `
            
                    noData.appendChild(forNoData);
            
                }
        }
   // For Sort By Views

//    const BtnForSort = (product) =>
//     {

//         product.forEach((element, index =>{
//             const viewsInInt = (element.others.views.replace("K",""))*1000;
//             console.log(viewsInInt);
            
//         }))
//     }
    const BtnForSort = () => {
        const mainDiv = document.getElementById('main-div');
        let product = Array.from(mainDiv.children);
    
        product.sort((a, b) => {
            const viewsA = parseFloat(a.querySelector('.card-body p:last-child').textContent.replace("K", "")) * 1000;
            const viewsB = parseFloat(b.querySelector('.card-body p:last-child').textContent.replace("K", "")) * 1000;
            return viewsB - viewsA;
        });
    
        mainDiv.innerHTML = ''; // Clear the container
        product.forEach(element => mainDiv.appendChild(element));
    };