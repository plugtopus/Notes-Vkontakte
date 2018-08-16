var uID = 0;
var storage_uID = 1;
var u_info;

var page_box = "page_info_wrap";

function hideAds() {
    if (document.getElementById("ads_left")) {
        document.getElementById("ads_left").style.display = "none";
    }
    ;
    if (document.getElementById("ya_direct")) {
        document.getElementById("ya_direct").style.display = "none";
    }
    ;
}

function getUI() {

    if (document.getElementById("profile")) {

        if (document.getElementById("profile_photo_link")) {
            var b = (document.getElementById("profile_photo_link"));

            if ((b).href.length) {
                var ppl = ((b).href);
                var t1 = ppl.indexOf("hoto");
                var str1 = ppl.substr((t1 + 4), 32);
                var t2 = str1.indexOf("_");
                var str2 = str1.substr(0, t2);
                uID = parseInt(str2);

                if (uID == "undefined") {
                    uID = 0;
                }
                ;
                if (uID !== uID) {
                    uID = 0;
                }
                ;
            }
        }


        if (uID === 0) {
            if ($("#profile_photo_link img[src]").length === 1) {
                var ppl = $("#profile_photo_link img").attr("src");
                var t1 = ppl.indexOf("vk.me");
                var str1 = ppl.substr((t1 + 7), 12);
                var t2 = str1.indexOf("/");
                var str2 = str1.substr(0, t2);
                uID = parseInt(str2);

                if (uID == "undefined") {
                    uID = 0;
                }
                ;
                if (uID !== uID) {
                    uID = 0;
                }
                ;
            }
        }


        if (uID === 0) {
            if ($("#profile_gift_send_btn").length === 1) {
                uID = parseInt($("#profile_gift_send_btn").attr("href").replace(/[^0-9]/g, ""));

                if (uID == "undefined") {
                    uID = 0;
                }
                ;
                if (uID !== uID) {
                    uID = 0;
                }
                ;
            }
        }

        if (uID === 0) {
            if ($(".page_actions_item").length !== 0) {
                $("body").find(".page_actions_item").each(function () {
                    var box = $(this);
                    if ($(box).html().indexOf("Пожалов") !== -1) {
                        if (($(box).attr("onClick")).length !== 0) {
                            var click = $(box).attr("onClick");
                            var pos1 = (click.indexOf("oid: "));
                            pos1 += 5;
                            var pos2 = (click.indexOf("}"));
                            uID = parseInt(click.substring(pos1, pos2));
                            if (uID == "undefined") {
                                uID = 0;
                            }
                            ;
                            if (uID !== uID) {
                                uID = 0;
                            }
                            ;
                        }
                    }
                    ;
                });
            }
        }

        if (uID === 0) {
            var link_str = (window.location.toString());
            var pos = link_str.indexOf("com/id");

            if (pos !== -1) {
                uID = parseInt(link_str.substr(pos + 6));

                if (uID !== uID) {
                    uID = 0;
                }
                ;
                if (uID == "undefined") {
                    uID = 0;
                }
                ;
            }
        }

    }
    ;

};

function crtP() {

    if (uID !== 0) {
        if (document.getElementById(page_box)) {
            var box = ("#" + page_box);


            if ($("#user_secure_info_box").length === 0) {
                var user_secure_info_box = (
                    '<div id="user_secure_info_box">' +
                    '<div id="user_secure_info_open">' + chrome.i18n.getMessage("add_note") + '</div>' +
                    '<div id="all_notes">' + chrome.i18n.getMessage("all_notes") + '</div>' +
                    '<div id="clear"></div>' +
                    '<div id="user_secure_info_info"></div>' +
                    '</div>');
                $(box).after($(user_secure_info_box));
            }
            ;

        }
        ;
    }
};

function lUidInfo() {

    if (uID !== 0) {


        if ($("#" + page_box).length !== 0) {

            if (uID !== 0) {

                if (uID !== storage_uID) {

                    var option_name = ("u" + uID);

                    chrome.storage.sync.get([option_name], function (items) {

                        u_info = (items[option_name]);

                        var text;

                        if ((u_info !== undefined) && (u_info.length !== 0)) {

                            if ($("#user_secure_info_info").length !== 0) {


                                if ($("#note").length === 0) {

                                    text = (
                                        '<div id="note">' + u_info + '</div>' +
                                        '<div id="delete">' + chrome.i18n.getMessage("delete") + '</div>' +
                                        '<div id="clear"></div>');
                                    $("#user_secure_info_info").css("display", "block").empty().append($(text));

                                }

                                else {
                                    $("#note").text(u_info);
                                }

                                storage_uID = uID;
                            }
                            ;

                        }
                        ;

                    })

                }

            }

        }

    }

};

function openUserSecureInfoBox() {

    if ($("#new_user_secure_info_box").length === 0) {

        var text = (
            '<div id="new_user_secure_info_box">' +
            '<textarea id="input_note" autofocus maxlength="140" placeholder="' + chrome.i18n.getMessage("input_note_placeholder") + '"></textarea>' +
            '<div id="new_user_secure_info_panel">' +
            '<div id="save">' + chrome.i18n.getMessage("save") + '</div>' +
            '<div id="cancel">' + chrome.i18n.getMessage("cancel") + '</div>' +
            '</div>');

        $(text).appendTo("body");

        if ((u_info !== undefined) && (u_info.length !== 0)) {
            $("#input_note").val(u_info);
        }
        ;

    }
};


function getAllSecureUserInfo() {

    if ($("#all_users_secure_info_box").length === 0) {

        var text = ('<div id="all_users_secure_info_box">' +
            '<div id="count_all_user_secure_info"></div>' +
            '<div id="close_all_user_secure_info">' + chrome.i18n.getMessage("close_all") + '</div>' +
            '</div>');

        $(text).appendTo("body");


        chrome.storage.sync.get(null, function (items) {

            var allKeys = Object.keys(items);
            var allValues = Object.values(items);

            if (allKeys.length != 0) {

                var i = 0;
                for (i = 0; i < allKeys.length; i++) {

                    var uId = allKeys[i];

                    if (uId.length > 1) {
                        var uId = parseInt(allKeys[i].substr(1));

                        if (uId != 0) {

                            var uInfo = allValues[i];

                            var ustr = (
                                '<div id="note_item_box">' +
                                '<div id="note_item_usrId">' +
                                '<a href="https://vk.com/id' + uId + '">' + chrome.i18n.getMessage("usrId") + uId + '</a>' +
                                '</div>' +
                                '<div id="note_item_usrNote">' + uInfo + '</div>' +
                                '</div>');

                            $(ustr).appendTo($("#all_users_secure_info_box"));

                        }
                    }
                }

                $("#count_all_user_secure_info").text(chrome.i18n.getMessage("notes_count") + i);

            }

        });

    }

    else {
        $("#all_users_secure_info_box").css("position", "fixed")
            .css("zIndex", "2147483647").css("left", 0).css("top", 0)
            .css("width", "270px").css("height", "100%").css("margin", 0);
    }

};


getUI();

crtP();

lUidInfo();


var listObserver = new MutationObserver(elementAdded);

listObserver.observe(document.body, {childList: true, subtree: true});

function elementAdded(mutations) {
    getUI();

    crtP();

    lUidInfo();
}


$("#user_secure_info_open").live("click", function () {

    if ($("#all_users_secure_info_box").length !== 0) {
        $("#all_users_secure_info_box").remove();
    }
    ;

    openUserSecureInfoBox();
});


$("#close_all_user_secure_info").live("click", function () {
    $("#all_users_secure_info_box").remove();
});


$("#save").live("click", function () {
    var option_name = ("u" + uID);
    var option_value = $("#input_note").val();

    if ((option_value !== undefined) && (option_value != '')) {

        option_value = (option_value.trim());

        var obj = {};
        obj[option_name] = option_value;
        chrome.storage.sync.set(obj, function () {
                $("#new_user_secure_info_box").remove();
                $("#note").text(option_value);
                $("#user_secure_info_info").css("display", "block");
                u_info = option_value;
            }
        );
    }

});


$("#all_notes").live("click", function () {
    getAllSecureUserInfo();
});

$("#delete").live("click", function () {

    if ($("#all_users_secure_info_box").length !== 0) {
        $("#all_users_secure_info_box").remove();
    }
    ;

    var option_name = ("u" + uID);
    chrome.storage.sync.remove([option_name]);
    $("#user_secure_info_info").css("display", "none");
    u_info = null;
});

$("#cancel").live("click", function () {
    $("#new_user_secure_info_box").remove();
});

hideAds();
