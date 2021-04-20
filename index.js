/*
* NIH BUAT LU PADA
* BISA LU RECODE 
* JANGAN LUPA NGETOD :V
*/

const {
	WAConnection,
	Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    MessageType,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    GroupSettingChange,
    waChatKey,
    mentionedJid,
    processTime
} = require("@adiwajshing/baileys")
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const { exec } = require('child_process')
const { fetchJson, color, bgcolor } = require('./lib/fetcher')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close, uploadImages } = require('./lib/function')
const fetch = require('node-fetch')
const WSF = require('wa-sticker-formatter')
const { EmojiAPI } = require("emoji-api")
const emoji = new EmojiAPI()
const get = require('got')
//const emoji = require('emoji-unicode')
const speednye = require('performance-now')
const fs = require('fs')
const os = require('os')
const qrcode = require('qrcode-terminal')
const moment = require('moment-timezone')
const welkom = JSON.parse(fs.readFileSync('./lib/group/welcome.json'))
const ytsearch = require('yt-search')
const request = require('request')
const { yta, ytv } = require('./lib/ytdl')
const Exif = require('./exif.js')
const hazn = new WAConnection()
const exif = new Exif()

const {
	vhter,
	lol,
	naufal,
	xtem,
	dev
} = require('./lib/config.json')

prefix = 'z'
fake = 'zhicco SELF'
let gambar = "" || fs.readFileSync('./media/gambar/biasa.png')
self = true
blocked = []

// SYSTEM QRCODE
hazn.ReconnectMode = 2
hazn.on('qr', qr => {
qrcode.generate(qr, { small : true })
console.log(color(`[ BOT ] SCAN QR DI ATAS BRO`,'white'))
})

hazn.on('credentials-updated', () => {
	const authinfo = hazn.base64EncodedAuthInfo()
	console.log('session has bim save')
	fs.writeFileSync('./hazn.json', JSON.stringify(authinfo, null, '\t'))
})
   fs.existsSync('./hazn.json') && hazn.loadAuthInfo('./hazn.json')
    hazn.connect();
   
   hazn.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	}) 
	
	hazn.on("CB:Call", json => {
		let call;
		calling = JSON.parse(JSON.stringify(json))
		call = calling[1].from
		setTimeout(function(){
			hazn.sendMessage(call, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!.\nJika ingin membuka block harap chat Owner!\nhttps//wa.me/+6281539336834', MessageType.text)
			.then(() => hazn.blockUser(call, "add"))
			}, 100);
		})
		
		
		
		
		
	    hazn.on('chat-update', async (mek) => {
		try {
			if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.blocked
			global.prefix
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
           
            const botNumber = zhicco.user.jid
			const ownerNumber = ['6281212814187@s.whatsapp.net']
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = hazn.contacts[sender] != undefined ? hazn.contacts[sender].vname || hazn.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await hazn.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
            const isWelcome = isGroup ? welkom.includes(from):false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				hazn.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				hazn.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? hazn.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : hazn.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}  
			const sendWebp = async(from, url) => {
                var names = Date.now() / 9999999999999;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './trash' + names + '.png', async function () {
                    console.log('selesai');
                    let ajg = './trash' + names + '.png'
                    let palak = './trash' + names + '.webp'
                    exec(`ffmpeg -i ${ajg} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${palak}`, (err) => {
                        let media = fs.readFileSync(palak)
                        hazn.sendMessage(from, media, MessageType.sticker,{quoted:mek})
                        fs.unlinkSync(ajg)
                        fs.unlinkSync(palak)
                    });
                });
            }
			const sendMedia = async(from, url, text="", mids=[]) =>{
                if(mids.length > 0){
                    text = normalizeMention(from, text, mids)
                } 
                const fn = Date.now() / 1000;
                const filename = fn.toString()
                let mime = ""
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        mime = res.headers['content-type']
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, filename, async function () {
                    console.log('kelar');
                    let media = fs.readFileSync(filename)
                    let type = mime.split("/")[0]+"Message"
                    if(mime === "image/gif"){
                        type = MessageType.video
                        mime = Mimetype.gif
                    }
                    if(mime.split("/")[0] === "audio"){
                        mime = Mimetype.mp4Audio
                    }
                    hazn.sendMessage(from, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
                    fs.unlinkSync(filename)
                });
            }


        
	        mess = {
				wait: 'tunggu sebentar.......',
				success: 'Sucess ✓“',
				notxt: 'textnya mana ?',
				error: {
					stick: 'gagal saat konvensi gambar ke sticker',
					Iv: 'link nya mokd :v'
				},
				only: {
					group: 'Khusus Grup!',
					ownerB: 'Khusus Owner Bot',
					admin: 'Khusus Admin grup'
				}
			}
			
		

			
			
			
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mSYSTEM\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
        	if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mSYSTEM\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
            if (self === true && !isOwner && isCmd) return
            switch(command) {
             case 'menu':
             case 'help':             
             //let patner = '6282147334265@s.whatsapp.net' 
             //let patner2 = '628990911211@s.whatsapp.net' 
             //let patner3 = '628976014170@s.whatsapp.net' 
             //let patner4 = '6287724880504@s.whatsapp.net' 
             //let patner5 = '6281220951879@s.whatsapp.net'
             //let patner6 = '6282334297175@s.whatsapp.net'
             //let patner7 = '6283102650464@s.whatsapp.net'
             const hitung = await fetchJson('https://xinzbot-api.herokuapp.com/api/hitungmundur?apikey=XinzBot&tanggal=12&bulan=4', {method:'get'})
		     const hiya = await fetchJson('https://xinzbot-api.herokuapp.com/api/ucapan?apikey=XinzBot&timeZone=Asia/Jakarta', {method:'get'})
		     var p = '```'
		    const tod =`${p}SELFBOT HAZN${p}
${p}Selamat ${hiya.result}${p}

${p}Hitung Mundur Bulan Puasa${p}
${p}Berakhir${p}

${p}prefix : ${prefix}${p}

${p}➸ ${prefix}nulis <text>${p}
${p}➸ ${prefix}takestick <text|text>${p}
${p}➸ ${prefix}play <query>${p}
${p}➸ ${prefix}emoji <emoji>${p}
${p}➸ ${prefix}trigger <Reply img>${p}
${p}➸ ${prefix}ttp <text>${p}
${p}➸ ${prefix}attp <text>${p}
${p}➸ ${prefix}dadu${p}
${p}➸ ${prefix}stickerbulet <img>${p}
${p}➸ ${prefix}ytmp3 <url>${p}
${p}➸ ${prefix}ytmp4 <url>${p}
${p}➸ ${prefix}ytsearch <query>${p}
${p}➸ ${prefix}ytshort <url>${p}
${p}➸ ${prefix}smeme <text1|text2>${p}
${p}➸ ${prefix}self${p}
${p}➸ ${prefix}public${p}
${p}➸ ${prefix}stat${p} 
${p}➸ ${prefix}removebg <reply img>${p}
${p}➸ ${prefix}stickerwm <nama|nama>${p}
${p}➸ ${prefix}sticker <reply media>${p}
${p}➸ ${prefix}topdf <reply img>${p}

${p}「THANK TOO」${p}
${p}✔ Radya- My Friends${p}
${p}✔ M HADI - My Lord${p}
${p}✔ BRYAN- My Friends${p}
${p}✔ FADHIL - My Friends${p}
${p}✔ AFFIS - My Friends${p}
${p}✔ FAUZY - My Friends${p}
`           
            const main = {
            text: tod,
            contextInfo: {
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            isForwarded: true,
            forwardingScore: 1,
            quotedMessage: {
            documentMessage: {
            fileName: fake,
            jpegThumbnail: gambar,
            mimetype: 'application/pdf',
            pageCount: 0
            }
            }
            }
            }
           hazn.sendMessage(from, main, MessageType.text, main)
           break           
           case 'topdf':
           if (!isQuotedImage) return reply('image nya di reply')
           const ida = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
           const idk = await hazn.downloadMediaMessage(ida, 'buffer') 
           const getpng = await uploadImages(idk, false)  
           reply(mess.wait)
           pdf = await getBuffer(`http://lolhuman.herokuapp.com/api/convert/imgtopdf?apikey=${lol}&img=${getpng}`)
           hazn.sendMessage(from, pdf, document, { mimetype: Mimetype.pdf, quoted:mek }).catch((err) => reply('error'))
           break
           case 'removebg':
           if (!isQuotedImage) return reply('reply gambar nya') 
           const biasalah = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
           const hazngans1  = await hazn.downloadMediaMessage(biasalah, 'buffer') 
           const getbg = await uploadImages(hazngans1, false) 
           reply(mess.wait)
           pft = await getBuffer(`http://lolhuman.herokuapp.com/api/removebg?apikey=${lol}&img=${getbg}`)
           await hazn.sendMessage(from, pft, image, {quoted:mek,caption:'Done'}).catch((err) => reply('error ):'))
           break 
            case 'swm': 
            case 'stcwm':
			case 'stickerwm':
				if (isMedia && !mek.message.videoMessage || isQuotedImage) {
					var arg2 = args.join('')
					if (!arg2.includes('|')) return reply(`Example : *${prefix}stickerwm nama|author*`)
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					const media = await hazn.downloadAndSaveMediaMessage(encmedia, `./trash/${sender}`)
					const packname1 = arg2.split('|')[0]
					const author1 = arg2.split('|')[1]
					exif.create(packname1, author1, `hazn_${sender}`)
					await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply('*eror ):*')
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./trash/hazn_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
									if (error) return reply('*eror ):*')
									hazn.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), sticker)
									fs.unlinkSync(media)	
									fs.unlinkSync(`./trash/${sender}.webp`)	
									fs.unlinkSync(`./trash/hazn_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./trash/${sender}.webp`)
				} else if ((isMedia && mek.message.videoMessage.fileLength < 10000000 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
					var arg2 = args.join('')
					if (!arg2.includes('|')) return reply(`Example: *${prefix}stickerwm nama|author*`)
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					const media = await hazn.downloadAndSaveMediaMessage(encmedia, `./trash/${sender}`)
					const packname1 = arg2.split('|')[0]
					const author1 = arg2.split('|')[1]
					exif.create(packname1, author1, `hazn_${sender}`)
					reply(mess.wait)
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply('*Terjadi Kesalahan*')
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./trash/hazn_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
									if (error) return reply('eror')
									hazn.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), sticker)									
									fs.unlinkSync(media)
									fs.unlinkSync(`./trash/${sender}.webp`)
									fs.unlinkSync(`./trash/hazn_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./trash/${sender}.webp`)
			} else {
			reply(`Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
			}
		    break 
		    case 's':
			case 'sticker':
				if (isMedia && !mek.message.videoMessage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					const media = await hazn.downloadAndSaveMediaMessage(encmedia, `./trash/${sender}`)
					const packnameku = '@selfbot hazn'
					const authorku = ''
					exif.create(packnameku, authorku, `stickernye_${sender}`)
					await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply('*eror ):*')
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./trash/stickernye_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
									if (error) return reply('*eror ):*')
									hazn.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), sticker)
									fs.unlinkSync(media)	
									fs.unlinkSync(`./trash/${sender}.webp`)	
									fs.unlinkSync(`./trash/stickernye_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./trash/${sender}.webp`)
				} else if ((isMedia && mek.message.videoMessage.fileLength < 10000000 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					const media = await hazn.downloadAndSaveMediaMessage(encmedia, `./trash/${sender}`)
					const packnamenye = '@selfbot hazn'
					const authornye = ''
					exif.create(packnamenye, authornye, `gif_${sender}`)
					reply(mess.wait)
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply('*Terjadi Kesalahan*')
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./trash/gif_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
									if (error) return reply('eror')
									hazn.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), sticker)									
									fs.unlinkSync(media)
									fs.unlinkSync(`./trash/${sender}.webp`)
									fs.unlinkSync(`./trash/gif_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./trash/${sender}.webp`)
			} else {
			reply(`Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
			}
		    break
           /*case 'welcome':
		   if (!isGroup) return reply(mess.only.group)
		   if (!isGroupAdmins) return reply(mess.only.admin)
		   if (args.length < 1) return reply('Hmmmm')
		   if (args[0] === 'enable') {
		   if (isWelcome) return reply('Udah aktif um')
		   welkom.push(from)
		   fs.writeFileSync('./lib/group/welcome.json', JSON.stringify(welkom))
		   reply('Sukses mengaktifkan fitur welcome di group ini âœ”ï¸')
		   } else if (args[0] === 'disable') {
		   welkom.splice(from, 1)
		   fs.writeFileSync('./lib/group/welcome.json', JSON.stringify(welkom))
	       reply('Sukses menonaktifkan fitur welcome di group ini âœ”ï¸')
		   } else { 
           reply('enable untuk mengaktifkan, disable untuk menonaktifkan') 
           }
           break*/
           case 'self':
           if (!isOwner) return reply(mess.only.ownerB)
           if (self === true) return 
            let haznk = {
            contextInfo: {
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            isForwarded: true,
            forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
          //pageCount: 0
           }
           }
           }
           }
           self = true 
           let lat =`_SUCESSS_`
           hazn.sendMessage(from, lat, MessageType.text, haznk)
           break  
           case 'stat': 
           let pingnye = speednye();
           let ping = speednye() - pingnye 
           const { 
           os_version } = hazn.user.phone
           let akutext =`_「STATUS」_
*NAMA : ${hazn.user.name}*
*BROWSER : ${hazn.browserDescription[1]}*
*HOST : ${hazn.browserDescription[0]}*
*VERSI : ${hazn.browserDescription[2]}*
*HP : ${hazn.user.phone.device_manufacturer}*
*WA : ${hazn.user.phone.wa_version}*
*RAM : ${(process.memoryUsage().heapUsed / 111 / 1029 ).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1000 / 2000 )}MB*
*OS : ${os_version} ANDROID*
*SPEED : ${ping.toFixed(4)} SECOND*
` 
            let faker = {
            contextInfo: {
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            isForwarded: true,
            forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
           }
           }
           }
           }
           hazn.sendMessage(from, akutext, text, faker) 
           break
           case 'public':
           if (!isOwner) return reply(mess.only.ownerB)
           if (self === false) return 
           let hazngans = {
           contextInfo: {
           participant: '0@s.whatsapp.net',
           remoteJid: 'status@broadcast',
           isForwarded: true,
           forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
          //pageCount: 0
           }
           }
           }
           }
           self = false
           let breh =`_SUCESSS_`
           hazn.sendMessage(from, breh, MessageType.text, hazngans)
           break
           case 'smeme':
           if (args === 0) return reply(`*Gunakan Cmd*:\n*${prefix + command}smeme <text|text>*`) 
           const dekode = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
           const dexode  = await hazn.downloadMediaMessage(dekode, 'buffer') 
           const getlink = await uploadImages(dexode, false)
           reply(mess.wait)
           gay = args.join('')
           var text1 = gay.split("|")[0];
           var text2 = gay.split("|")[1];
           image = await fetchJson(`http://api-melodicxt-2.herokuapp.com/api/meme-maker?url=${getlink}&text=${text1}|${text2}`, {method:'get'})
           buff = await getBuffer(image.result.result)
           await sendWebp(from, buff).catch((err) => reply('error ):'))
           break
           case 'ytsearch':
           if (args === 0) return reply(mess.notxt)
           reply(mess.wait)
           nonya = '0'
           teks = `*untuk mendapatkan audio ketik*:\n*${prefix}getaudio <urutan>*\n*Contoh* : ${prefix}getaudio 1\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n` 
           const aku1 = await fetchJson(`https://api.vhtear.com/youtube?query=${args.join('')}&apikey=${vhter}`, {method:'get'})
           for (let apa of aku1.result){
           	teks += `_# Urutan : ${nonya}_\n_# Judul : ${apa.title}_\n_# Channel : ${apa.channel}_\n_# View : ${apa.views}_\n_# Durasi : ${apa.duration}_\n*# Url : ${apa.urlyt}*\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n`
               nonya ++ 
               bye = await getBuffer(apa.image)
           }
           await reply(teks.trim()).catch((err) => reply('error'))
           break  
           case 'getaudio':  
           if (args === 0) return reply('urutan ke berapa?')
           urlnye = args[0]
           yta(`https://youtu.be/${aku1.result[urlnye].id}`)
           .then((datares) => {
           const { dl_link, thumb, filsizeF, filesize, title } = datares
           axios.get(`https://api.zeks.xyz/api/urlshort-all?apikey=hazngans><&url=${dl_link}`).then(async(link) => {
           if (Number(filesize) >= 5000) return sendMedia(from, thumb, `*「GET AUDIO」*\n_Data Berhasil Di Acess_\n\n*Nama*: ${title}\n*Size*: ${filesizeF}\n*Ext*: MP3\n*Link*: ${link.result_3}\n\n_Size Sudah Melebihi Batas Silakan Download Melalui Link!!_`)
           let breh = `*「GET AUDIO」*\n_Data Berhasil Di Acess_\n\n*Nama*: ${title}\n*Size*: ${filesizeF}\n*Ext*: MP3\n_Audio Sedang Di Kirim Mohon Tunggu_`
           sendMedia(from, thumb, breh)
           await sendMedia(from, dl_link).catch((err) => reply('gagal'))
           })
           }) 
           try {
           } catch(err) {
           reply('error ):')
           }
           break
           case 'dadu':
           const anu9 = await fetchJson(`https://leyscoders-api.herokuapp.com/api/dadu?apikey=demo`, {method:'get'})
           const stickermk = new WSF.Sticker(`${anu9.result}`, { crop: true, animated: false, pack: 'selfbot hazn 🗿', author: '' })
           await stickermk.build()
           const stcBuffr = await stickermk.get()
           hazn.sendMessage(from, stcBuffr, sticker, {quoted:mek}).catch((err) => reply('error'))
           break 
           case 'ytshort':
           if (args === 0) return reply('url nya mana um?')
           reply(mess.wait)
           axios.get(`https://api.vhtear.com/youtube_short_download?link=${args.join('')}&apikey=${vhter}`).then((data) => {
           any = `https://i.ibb.co/j6wLyyg/download.png`
           teks = `*「YOUTUBE SHORT」*\n*Nama*: ${data.data.result.title}\n*Channel*: ${data.data.result.uploader_url}\n*View*: ${data.data.result.view_count}\n*Ext*: ${data.data.result.ext}\n*Link*: ${data.data.result.url_video}\n\n_Mohon Untuk Download Sendiri File Nya_`
           hazn.sendMessage(from, any, image, { quoted : mek, caption:teks }).catch((err) => reply('errror ):'))
           })
           break
           case 'emoji':
		   if (args === 0) return reply('emojinya?')   
		   aku4 = args.join(' ')
		   reply(mess.wait)
           emoji.get(`${aku4}`).then(emoji => {
           link = `${emoji.images[4].url}`
		   sendWebp(from, `${link}`).catch(() => reply('gagal'))
           })
    	   break
           case 'nulis':
           try {
           if (args.length < 1) return reply(mess.notxt)
           reply(mess.wait)
           bo = args.join(' ')
           api = await getBuffer(`https://api.zeks.xyz/api/nulis?text=${bo}&apikey=apivinz`)
           await hazn.sendMessage(from, api, image, { quoted:mek,caption:'Done!' })
           } catch(e) { 
              reply(`${e}`)
           }
           break 
            case 'takestick':
			if (!isQuotedSticker) return reply(`*Example*:\n*${prefix}takestick nama|author*`)
		    const aku = body.slice(11)
			if (!aku.includes('|')) return reply(`*Example*:\n*${prefix}takestick nama|author*`)
		    const encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
		    const media = await hazn.downloadAndSaveMediaMessage(encmedia, `./trash/${sender}`)
		    const packnamenye = aku.split('|')[0]
		    const authornye = aku.split('|')[1]
			exif.create(packnamenye, authornye, `aku2_${sender}`)
			exec(`webpmux -set exif ./trash/aku2_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
			if (error) return reply('*error ): coba ulangin*')
			hazn.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), MessageType.sticker, {quoted:mek})
			fs.unlinkSync(media)
		    fs.unlinkSync(`./trash/aku2_${sender}.exif`)
			})
		    break 
	       case 'play':
	       if (args.length < 1) return reply('*query nya mana?*')
	       reply(mess.wait)
	       lagu = args.join('')
	       kamu = await ytsearch(lagu)
	       aky = kamu.all
	       let linknye = aky[0].url
           try { 
           yta(linknye).then((res) => {
           const { dl_link, title, thumb, filesizeF, filesize } = res
           axios.get(`https://api.zeks.xyz/api/urlshort?url=${dl_link}&apikey=apivinz`).then(async (hm) => {
           if (Number(filesize) >= 5000) return sendMedia(from, thumb, `*「PLAY」*\n*Nama*: ${title}\n*Type*: MP3\n* Size*: ${filesizeF}\n*Url*: ${hm.data.result}\n\n_Maaf File Size Melebihi Batas!!! Silakan Download File Nya sendiri!!_`)
          const valid = `*「PLAY」*\n*Nama*: ${title}\n*Type*: MP3\n*Size*: ${filesizeF}\n\n_Mohon Tunggu Sebentar Mungkin Agak lama_`
          sendMedia(from, thumb, valid)
          await sendMedia(from, dl_link)
          })
          })
          } catch(err) {
          reply('*error kak*')
          }
          break  
          case 'ytmp3': 
          if (args === 0) return reply('url nya mana um?')
          reply(mess.wait)
          try {
          biasa = args.join('')
          yta(biasa).then((data) => {
          const { dl_link, title, thumb, filesizeF, filesize } = data
          axios.get(`https://api.zeks.xyz/api/urlshort?url=${dl_link}&apikey=apivinz`).then( async(kamu) => {
          if (Number(filesize) >= 5000) return sendMedia(from, thumb, `*「YTMP3」*\n*Data Berhasil Di Dapet!!*\n*Nama*: ${title}\n*Type*: MP3\n* Size*: ${filesizeF}\n*Url*: ${kamu.data.result}\n\n_Maaf File Size Melebihi Batas Silakan Download File Nya sendiri!!_`)
          const validyt = `*「YTMP3」*\n*Data Berhasil Di Dapet!!*\n*Nama*: ${title}\n*Type*: MP3\n*Size*: ${filesizeF}\n_Mohon Tunggu Mungkin Lama :v_`
          sendMedia(from, thumb, validyt)
          await sendMedia(from, dl_link)
          })
          })
          } catch(err) {
          reply('erro')
          }
          break 
          case 'ytmp4': 
          if (args === 0) return reply('url nya mana um?')
          reply(mess.wait)
          try {
          auh = args.join('')
          yta(auh).then((lu) => {
          const { dl_link, title, thumb, filesizeF, filesize } = lu
          axios.get(`https://api.zeks.xyz/api/urlshort?url=${dl_link}&apikey=apivinz`).then( async(tae) => {
          if (Number(filesize) >= 4000) return sendMedia(from, thumb, `*「YTMP3」*\n*Data Berhasil Di Dapet!!*\n"Nama*: ${title}\n*Type*: MP4/VIDEO\n*Size*: ${filesizeF}\n*Url*: ${tae.data.result}\n\n_Maaf File Size Melebihi Batas Silakan Download File Nya sendiri!!_`)
          const validytv = `*「YTMP4」*\n*Data Berhasil Di Dapet!!*\n*Nama*: ${title}\n*Type*: MP4/VIDEO\n*Size*: ${filesizeF}\n_Mohon Tunggu Mungkin Lama :v_`
          sendMedia(from, thumb, validytv)
          await sendMedia(from, dl_link)
          })
          })
          } catch(err) {
          reply('erro ):')
          }
          break
          case 'ttp': 
          if (args.length < 1) return reply(mess.notxt)
          const hah = body.slice(4)
          const anumu = await getBuffer(`https://leyscoders-api.herokuapp.com/api/ttp1?text=${hah}&apikey=demo`)
          const stickerku = new WSF.Sticker(anumu, { crop: true, animated: false, pack: 'selfbot hazn 🤣', author: '' })
          await stickerku.build()
          const stcBuffer = await stickerku.get()
          hazn.sendMessage(from, stcBuffer, sticker).catch(() => reply('error'))
          break  
          case 'stickerbulet':
          const encmedia1 = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
          const media1 = await hazn.downloadMediaMessage(encmedia1, 'buffer') 
          const patrcik = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
	      const hayokamu = await hazn.downloadAndSaveMediaMessage(patrcik, `./trash/${sender}`)
		  getimg = await uploadImages(media1, false)
		  kamu = await getBuffer(`http://lolhuman.herokuapp.com/api/convert/towebpwround?apikey=${lol}&img=${getimg}`) 
		  const packnamenya = 'selfbot'
          const authornya = ''
		  exif.create(packnamenya, authornya, `biasalah_${sender}`)
		  exec(`webpmux -set exif ./trash/biasalah_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
		  await hazn.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), sticker, {quoted:mek}).catch((err) => reply('error')) 
		  fs.unlinkSync(hayokamu)
		  fs.unlinkSync(`./trash/biasalah_${sender}.exif`)
		  })
		  break
          case 'attp':
          if (args.length < 1) return reply(mess.notxt)
          const haw = args.join('')
          const atep = await getBuffer(`http://lolhuman.herokuapp.com/api/attp?apikey=${lol}&text=${haw}`)
          hazn.sendMessage(from, atep, sticker).catch(() => reply('error'))
          break
          default: 
					if (isGroup && budy != undefined) {
					} else {
						console.log(color('[SYSTEM]','yellow'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	
   
