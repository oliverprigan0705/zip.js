var TEXT_CONTENT = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.";
var FILENAME = "lorem.txt";

var blobBuilder, blob, BlobBuilder = this.WebKitBlobBuilder || this.MozBlobBuilder || this.BlobBuilder, zipFs = new zip.FS();

function onerror(message) {
	console.error(message);
}

function zipBlob(blob, callback) {
	zipFs.root.addChild(FILENAME, blob);
	zipFs.exportZip(new zip.BlobWriter(), callback, null, onerror);
}

function unzipBlob(blob, callback) {
	zipFs.importZip(new zip.BlobReader(blob), function() {
		callback(zipFs.root.children[0].blob);
	}, null, onerror);
}

function logBlobText(blob) {
	var reader = new FileReader();
	reader.onload = function(e) {
		console.log(e.target.result);
		console.log("--------------");
	};
	reader.readAsText(blob);
}

zip.workerScriptsPath = "../";
blobBuilder = new BlobBuilder();
blobBuilder.append(TEXT_CONTENT);
blob = blobBuilder.getBlob();
logBlobText(blob);
zipBlob(blob, function(zippedBlob) {
	unzipBlob(zippedBlob, function(unzippedBlob) {
		logBlobText(unzippedBlob);
	});
});
