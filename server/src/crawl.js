const puppeteer = require('puppeteer');
const{ 
    addNewProduct,
    getAllProducts
    } =require('./AddProduct')

const{ 
    addCategory,
    getAllCategories
    } =require('./AddCategory')






const crawl = async () => {
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport: {
            width: 1100,
            height: 1000
        }});

    const page = await browser.newPage();

    await page.goto('https://www.mediamarkt.es/',{
        waitUntil: 'domcontentloaded',
        timeout: 0
    });


    await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'
       )


    await page.setDefaultNavigationTimeout(0);
    console.log("scraping...")

    const cookiePage = await page.waitForSelector(".StyledConsentLayer-g0yhcr-3")
    const CookieButton = await cookiePage.$("button.iWGXyY")
    await CookieButton.evaluate(b => b.click());


    const navBar = await page.waitForSelector(".StyledControlRow-sc-1hrkkmf-0")
                        
    const categoryButton =await navBar.$(".Icon-sc-1vrq823-0") 
    await categoryButton.evaluate(b => b.click());
                
                
                    
     //go to the informatica 
    const categories = await page.$$(".cUKbPv > li.dEUAVd")            
    const name = await categories[1].$eval('a', a => a.innerText)
    // console.log('category name: ', name)
    const liButton = await categories[1].$("a")
    await liButton.evaluate(b => b.click());
                    
                    
    //Portátiles
    await page.waitForSelector(".Wrapper-sc-1okdequ-2")
    const Portátiles = await page.$("a.jUuUVr")
    await Portátiles.evaluate(b => b.click());
                    
    //Portátiles li
    await page.waitForSelector(".TreeFacetList-sc-1aagwg-0")
    let PortátilesCategories = await page.$$(".cXecqj > li.cqBkQN")
                
                    
                    
    //Portátiles de 14" a 16.9"
    let Portátiles_de_14_a_16_9 = await PortátilesCategories[1].$eval('a', a => a.innerText)
    Portátiles_de_14_a_16_9 = await Portátiles_de_14_a_16_9.split("(").shift()

    //add category 
    let newCategory1 ={};
    newCategory1['name'] = Portátiles_de_14_a_16_9;
    addCategory(newCategory1)

    // console.log('PortátilesCategories name: ', Portátiles_de_14_a_16_9)
    const Portátiles_de_14_a_16_9LiButton = await PortátilesCategories[1].$("a")
    await Portátiles_de_14_a_16_9LiButton.evaluate(b => b.click());
    await page.waitForNavigation();

    //load more product
    // await page.waitForSelector(".dmRvCm")
    // const loadMoreButton = await page.$("button.cUpAbt")
    // await loadMoreButton.evaluate(b => b.click());
    // await page.waitForNavigation();

                    
    //Portátiles_de_14_a_16_9 products
    await page.waitForSelector(".ProductContainer-hvvgwa-1")
    const Portátiles_de_14_a_16_9Products = await page.$$(".bilJsB ")
    
    for (const p of Portátiles_de_14_a_16_9Products){  

            //category
            let pCategory = Portátiles_de_14_a_16_9


            //name
            const pname = await p.$eval('a.cOmqtX p.doYUxh', n => n.innerHTML)
            //url
            const purl = await p.$eval('a.cOmqtX', a => a.href)
    
            //price
            await page.waitForSelector(".fogepx")
            const price = await p.$eval('.kZCfsu', a => a.innerText)
                            
                    
            //brand
            const myArr = await pname.split(" ");
            let index = await myArr.indexOf("-");
            myArr[0] === 'Apple' ?  brand =  myArr[0] : brand =  myArr[index+1]
            
    
            //delivery
            await p.waitForSelector(".iPyFyN")
            let delivery = await p.$eval('.iPyFyN > span.egVdxU', a => a.innerText)
            // delivery = await delivery.split(" ").pop()
    
            
            //specifications
            let specifications = []
            await page.waitForSelector(".gmbwfH")
            const specificationsList = await p.$$(".gmbwfH > li.gDeZlT")
    
            for (const spec of specificationsList){
                const key = await spec.$eval('.bqgsPu', n => n.innerHTML)
                const value = await spec.$eval('.dWfJwo', n => n.innerHTML)
                specifications.push(JSON.stringify({key, value}))
                
            }
                    
                    
            //add product
            const tempP ={};
            tempP['name'] = pname;
            tempP['url'] = purl;
            tempP['price'] = price;
            tempP['brand'] = brand;
            tempP['category'] = pCategory;
            tempP['delivery'] = delivery;
            tempP['specifications'] = specifications;
    
            addNewProduct(tempP)
        
        }
                    
                     
                    
                    
    // Convertibles 2 en 1
    
    page.goBack()
    await page.waitForNavigation();
    await page.waitForSelector(".TreeFacetList-sc-1aagwg-0")
    await page.waitForSelector(".cXecqj")
    PortátilesCategories = await page.$$(".cXecqj > li.cqBkQN")

    let Convertibles_2_en_1 = await PortátilesCategories[3].$eval('a', a => a.innerText)
    Convertibles_2_en_1 = await Convertibles_2_en_1.split("(").shift()
    
    //add category 
    let newCategory2 ={};
    newCategory2['name'] = Convertibles_2_en_1;
    addCategory(newCategory2)


    // console.log('Convertibles_2_en_1 name: ', Convertibles_2_en_1)
    const Convertibles_2_en_1LiButton = await PortátilesCategories[3].$("a")
    await Convertibles_2_en_1LiButton.evaluate(b => b.click());
    await page.waitForNavigation();

    //Convertibles_2_en_1 products
    await page.waitForSelector(".ProductContainer-hvvgwa-1")
    const Convertibles_2_en_1Products = await page.$$(".bilJsB ")
    for (const p of Convertibles_2_en_1Products){
        
        //category
        let pCategory = Convertibles_2_en_1
        //name
        await p.waitForSelector(".cOmqtX")
        const pname = await p.$eval('a.cOmqtX p.doYUxh', n => n.innerHTML)
        //url
        const purl = await p.$eval('a.cOmqtX', a => a.href)

        //price
        await page.waitForSelector(".fogepx")
        const price = await p.$eval('.kZCfsu', a => a.innerText)
        

        //brand
       const myArr = await pname.split(" ");
       let index = await myArr.indexOf("-");
       myArr[0] === 'Apple' ?  brand =  myArr[0] : brand =  myArr[index+1]

        //delivery
        await p.waitForSelector(".iPyFyN")
        let delivery = await p.$eval('.iPyFyN > span.egVdxU', a => a.innerText)
        // delivery = await delivery.split(" ").pop()

        
        //specifications
        let specifications = []
        await page.waitForSelector(".gmbwfH")
        const specificationsList = await p.$$(".gmbwfH > li.gDeZlT")

            for (const spec of specificationsList){
                const key = await spec.$eval('.bqgsPu', n => n.innerHTML)
                const value = await spec.$eval('.dWfJwo', n => n.innerHTML)
                specifications.push(JSON.stringify({key, value}))
                
            }


        //add product
        const tempP ={};
        tempP['name'] = pname;
        tempP['url'] = purl;
        tempP['price'] = price;
        tempP['brand'] = brand;
        tempP['category'] = pCategory;
        tempP['delivery'] = delivery;
        tempP['specifications'] = specifications;

        addNewProduct(tempP)
    
    }




    await browser.close();
    console.log('products scraped successfully')
    // console.log(getAllProducts())
    // console.log(getAllCategories())
    

    return {
            products: await getAllProducts(),
            categories: await getAllCategories()
            }
    
}
module.exports = {crawl}